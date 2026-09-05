package com.relaxstress.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class CheckinDto {

    @Data
    public static class Request {
        @NotNull(message = "userId is required")
        private String userId;

        @NotBlank(message = "mood is required")
        private String mood;

        @NotNull(message = "stressLevel is required")
        @Min(value = 1, message = "Stress level must be at least 1")
        @Max(value = 10, message = "Stress level must be at most 10")
        private Integer stressLevel;

        private String cause;

        @Min(value = 1, message = "Available minutes must be at least 1")
        private Integer availableMinutes;
    }

    @Data
    public static class Response {
        private String id;
        private String userId;
        private String mood;
        private Integer stressLevel;
        private String cause;
        private Integer availableMinutes;
        private String createdAt;
    }
}
