package com.ssafy.dksl.model.dto.command;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LogoutCommand {
    String accessToken;
}