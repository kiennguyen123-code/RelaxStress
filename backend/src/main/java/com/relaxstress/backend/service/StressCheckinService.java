package com.relaxstress.backend.service;

import com.relaxstress.backend.dto.CheckinDto;
import com.relaxstress.backend.entity.StressCheckin;
import com.relaxstress.backend.repository.StressCheckinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StressCheckinService {

    private final StressCheckinRepository checkinRepository;

    public CheckinDto.Response create(CheckinDto.Request request) {
        StressCheckin checkin = StressCheckin.builder()
                .userId(UUID.fromString(request.getUserId()))
                .mood(request.getMood())
                .stressLevel(request.getStressLevel())
                .cause(request.getCause())
                .availableMinutes(request.getAvailableMinutes())
                .build();

        StressCheckin saved = checkinRepository.save(checkin);
        return toResponse(saved);
    }

    public List<CheckinDto.Response> getByUser(String userId) {
        return checkinRepository
                .findByUserIdOrderByCreatedAtDesc(UUID.fromString(userId))
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<CheckinDto.Response> getRecentByUser(String userId) {
        return checkinRepository
                .findTop7ByUserIdOrderByCreatedAtDesc(UUID.fromString(userId))
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public CheckinDto.Response getById(String id) {
        StressCheckin checkin = checkinRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Checkin not found: " + id));
        return toResponse(checkin);
    }

    private CheckinDto.Response toResponse(StressCheckin c) {
        CheckinDto.Response res = new CheckinDto.Response();
        res.setId(c.getId().toString());
        res.setUserId(c.getUserId() != null ? c.getUserId().toString() : null);
        res.setMood(c.getMood());
        res.setStressLevel(c.getStressLevel());
        res.setCause(c.getCause());
        res.setAvailableMinutes(c.getAvailableMinutes());
        res.setCreatedAt(c.getCreatedAt() != null ? c.getCreatedAt().toString() : null);
        return res;
    }
}
