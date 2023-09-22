package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.response.TeamResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.util.exception.CreateDataException;
import com.ssafy.dksl.util.exception.GetDataException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamService {
    // boolean createTeam(String token) throws CreateDataException;
    List<TeamResponse> getTeamList(List<Team> teamList) throws GetDataException;
    List<TeamResponse> getAllTeamList() throws GetDataException;

    List<TeamResponse> getRecentTeamList() throws GetDataException;
    List<TeamResponse> getSearchTeamList(SearchTeamCommand searchTeamCommand) throws GetDataException;
}