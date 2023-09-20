package com.ssafy.dksl.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dksl.model.dto.SummonerDto;
import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.entity.UserRedis;
import com.ssafy.dksl.model.repository.UserRedisRepository;
import com.ssafy.dksl.model.repository.UserRepository;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateUserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Value("${riot.summoner.api.key}")
    private String RIOT_SUMMONER_API_KEY;

    @Value("${riot.summoner.api.uri}")
    private String RIOT_SUMMONER_API_URI;

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserRedisRepository userRedisRepository;

    @Autowired
    UserServiceImpl(PasswordEncoder passwordEncoder, AuthenticationManagerBuilder authenticationManagerBuilder, JwtUtil jwtUtil, UserRepository userRepository, UserRedisRepository userRedisRepository){
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtUtil = jwtUtil;

        this.userRepository = userRepository;
        this.userRedisRepository = userRedisRepository;
    }

    public boolean register(UserDto userDto) throws RegisterException {
        // 가입되어 있는 아이디인지 확인
        if(userRepository.findByClientId(userDto.getClientId()).isPresent()) {
            throw new RegisterException("해당 아이디를 가진 회원이 이미 존재합니다.");
        } else if(userRepository.findByName(userDto.getName()).isPresent()) {
            throw new RegisterException("해당 닉네임을 가진 회원이 이미 존재합니다.");
        }

        try {
            SummonerDto summonerDto = callApi(userDto.getName());

            User user = User.builder()
                    .clientId(userDto.getClientId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .name(summonerDto.getName())
                    .puuid(summonerDto.getPuuid())
                    .email(userDto.getEmail())
                    .build();

            userRepository.save(user);

            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RegisterException();
        }
    }

    @Override
    public UserDto login(UserDto userDto) throws LoginException {
        // 가입되어 있는 아이디인지 확인
        User user = userRepository.findByClientId(userDto.getClientId()).orElseThrow(() -> new LoginException("아이디 혹은 비밀번호를 틀렸습니다."));

        if(!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new LoginException("아이디 혹은 비밀번호를 틀렸습니다.");
        }

        if(userRedisRepository.findById(user.getPuuid()).isPresent()) {
            throw new LoginException("중복 로그인 하였습니다.");
        }

         String token = jwtUtil.generateToken(user.getClientId(), "ROLE_USER");
         System.out.println("토큰 정보 : " + token);

        // Redis에 토큰 넣기
        UserRedis userRedis = UserRedis.builder()
                .clientId(user.getClientId())
                .refreshToken(token)
                .build();

        userRedisRepository.save(userRedis);

        return UserDto.builder()
                .name(user.getName())
                .refreshToken(token)
                .build();
    }

    @Override
    public boolean updateUser(String token, UserDto userDto) throws UpdateUserException {
        System.out.println("토큰 정보 : " + token);
        UserRedis userRedis = userRedisRepository.findById(userDto.getClientId()).orElseThrow(() -> new UpdateUserException("회원정보가 존재하지 않습니다."));
        if (!jwtUtil.getClientId(userRedis.getRefreshToken()).equals(jwtUtil.getClientId(token))) {
            throw new UpdateUserException("회원 정보가 일치하지 않습니다..");
        }

        User user = userRepository.findByClientId(jwtUtil.getClientId(token)).orElseThrow(() -> new UpdateUserException("회원정보가 존재하지 않습니다."));
        /*
            TO DO : 소속 추가
         */

        try {
            user = User.builder()
                    .id(user.getId())
                    .clientId(user.getClientId())
                    .password(user.getPassword())
                    .name(userDto.getName())
                    .puuid(user.getPuuid())
                    .email(userDto.getEmail())
                    .teams(user.getTeams())
                    .build();

            userRepository.save(user);

            return true;

        } catch(Exception e) {
            log.error(e.getMessage());
            throw new UpdateUserException();
        }
    }

    private SummonerDto callApi(String name) throws RegisterException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(URI.create(RIOT_SUMMONER_API_URI + URLEncoder.encode(name)))
                .header("X-Riot-Token", RIOT_SUMMONER_API_KEY)
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());

            // 응답 코드 확인
            int statusCode = response.statusCode();
            if(statusCode != 200) throw new RegisterException("해당 닉네임을 찾을 수 없습니다.");

            ObjectMapper objectmapper = new ObjectMapper();
            return objectmapper.readValue(response.body(), SummonerDto.class);  // DTO에 정보 삽입
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RegisterException();
        }
    }
}
