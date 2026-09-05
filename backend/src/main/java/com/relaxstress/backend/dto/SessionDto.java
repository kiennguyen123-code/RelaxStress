package com.relaxstress.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

public class SessionDto {

    @Data
    public static class Request {
        @NotNull(message = "userId is required")
        private String userId;

        private String checkinId;

        @NotNull(message = "activityId is required")
        private String activityId;

        private Integer stressBefore;
        private Integer stressAfter;
        private Boolean completed;
    }

    @Data
    public static class Response {
        private String id;
        private String userId;
        private String checkinId;
        private String activityId;
        private String activityName;
        private Integer stressBefore;
        private Integer stressAfter;
        private Boolean completed;
        private String createdAt;
    }
}
