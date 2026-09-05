package com.relaxstress.backend.controller;

import com.relaxstress.backend.dto.CheckinDto;
import com.relaxstress.backend.service.StressCheckinService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checkins")
@RequiredArgsConstructor
public class StressCheckinController {

    private final StressCheckinService checkinService;

    /** POST /api/checkins */
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CheckinDto.Request request) {
        try {
            CheckinDto.Response response = checkinService.create(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** GET /api/checkins/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(checkinService.getById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** GET /api/checkins/user/{userId} */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CheckinDto.Response>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(checkinService.getByUser(userId));
    }

    /** GET /api/checkins/user/{userId}/recent — last 7 for chart */
    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<CheckinDto.Response>> getRecentByUser(@PathVariable String userId) {
        return ResponseEntity.ok(checkinService.getRecentByUser(userId));
    }
}
