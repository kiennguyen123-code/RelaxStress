package com.relaxstress.backend.service;

import com.relaxstress.backend.dto.SessionDto;
import com.relaxstress.backend.entity.Activity;
import com.relaxstress.backend.entity.ActivitySession;
import com.relaxstress.backend.repository.ActivityRepository;
import com.relaxstress.backend.repository.ActivitySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivitySessionService {

    private final ActivitySessionRepository sessionRepository;
    private final ActivityRepository activityRepository;

    public SessionDto.Response start(SessionDto.Request request) {
        ActivitySession session = ActivitySession.builder()
                .userId(UUID.fromString(request.getUserId()))
                .checkinId(request.getCheckinId() != null ? UUID.fromString(request.getCheckinId()) : null)
                .activityId(UUID.fromString(request.getActivityId()))
                .stressBefore(request.getStressBefore())
                .build();

        ActivitySession saved = sessionRepository.save(session);
        return toResponse(saved);
    }

    public SessionDto.Response complete(String sessionId, Integer stressAfter) {
        ActivitySession session = sessionRepository.findById(UUID.fromString(sessionId))
                .orElseThrow(() -> new IllegalArgumentException("Session not found: " + sessionId));

        session.setStressAfter(stressAfter);
        session.setCompleted(true);
        ActivitySession saved = sessionRepository.save(session);
        return toResponse(saved);
    }

    public List<SessionDto.Response> getByUser(String userId) {
        return sessionRepository
                .findByUserIdOrderByCreatedAtDesc(UUID.fromString(userId))
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public long countCompletedByUser(String userId) {
        return sessionRepository.countByUserIdAndCompleted(UUID.fromString(userId), true);
    }

    private SessionDto.Response toResponse(ActivitySession s) {
        SessionDto.Response res = new SessionDto.Response();
        res.setId(s.getId().toString());
        res.setUserId(s.getUserId() != null ? s.getUserId().toString() : null);
        res.setCheckinId(s.getCheckinId() != null ? s.getCheckinId().toString() : null);
        res.setActivityId(s.getActivityId() != null ? s.getActivityId().toString() : null);
        res.setStressBefore(s.getStressBefore());
        res.setStressAfter(s.getStressAfter());
        res.setCompleted(s.getCompleted());
        res.setCreatedAt(s.getCreatedAt() != null ? s.getCreatedAt().toString() : null);

        // Enrich with activity name
        if (s.getActivityId() != null) {
            activityRepository.findById(s.getActivityId())
                    .ifPresent(a -> res.setActivityName(a.getName()));
        }
        return res;
    }
}
