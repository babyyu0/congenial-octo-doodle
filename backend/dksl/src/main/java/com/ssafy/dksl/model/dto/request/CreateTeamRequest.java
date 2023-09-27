package com.ssafy.dksl.model.dto.request;

import com.ssafy.dksl.model.dto.command.CreateTeamCommand;
import com.ssafy.dksl.util.exception.FileNotFoundException;
import com.ssafy.dksl.util.exception.common.CustomException;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class CreateTeamRequest {
    @NotNull
    private String name;
    private String description;
    private MultipartFile img;

    public CreateTeamCommand toCreateTeamCommand(String token) throws CustomException {
        if (this.img == null) {
            throw new FileNotFoundException();
        }
        String contentType = this.img.getContentType();  // 확장자 타입
        if (contentType == null || contentType.trim().equals("")) {  // 확장자 타입이 없을 경우
            throw new FileNotFoundException();
        } else if (!contentType.contains("image/jpeg") || contentType.contains("image/png")) {  // 확장자 타입이 jpg나 png가 아닐 경우
            throw new FileNotFoundException();
        }

        return CreateTeamCommand.builder()
                .name(this.getName())
                .description(this.getDescription())
                .accessToken(token)
                .img(this.getImg())
                .build();
    }
}