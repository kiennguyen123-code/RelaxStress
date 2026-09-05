package com.relaxstress.backend.controller;

import com.relaxstress.backend.dto.SessionDto;
import com.relaxstress.backend.service.ActivitySessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class ActivitySessionController {

    private final ActivitySessionService sessionService;

    /** POST /api/sessions — start a session */
    @PostMapping
    public ResponseEntity<?> start(@Valid @RequestBody SessionDto.Request request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(sessionService.start(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * PATCH /api/sessions/{id}/complete
     * Body: { "stressAfter": 3 }
     */
    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable String id,
                                      @RequestBody Map<String, Integer> body) {
        try {
            Integer stressAfter = body.get("stressAfter");
            return ResponseEntity.ok(sessionService.complete(id, stressAfter));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** GET /api/sessions/user/{userId} */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SessionDto.Response>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(sessionService.getByUser(userId));
    }

    /** GET /api/sessions/user/{userId}/count — total completed sessions */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Map<String, Long>> countCompleted(@PathVariable String userId) {
        long count = sessionService.countCompletedByUser(userId);
        return ResponseEntity.ok(Map.of("completedSessions", count));
    }
}
