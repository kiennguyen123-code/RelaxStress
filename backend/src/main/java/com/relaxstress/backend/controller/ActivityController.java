package com.relaxstress.backend.controller;

import com.relaxstress.backend.entity.Activity;
import com.relaxstress.backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    /** GET /api/activities */
    @GetMapping
    public ResponseEntity<List<Activity>> getAll() {
        return ResponseEntity.ok(activityService.getAll());
    }

    /** GET /api/activities/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(activityService.getById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** GET /api/activities/category/{category} */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Activity>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(activityService.getByCategory(category));
    }

    /**
     * GET /api/activities/recommend?stress=5&minutes=10
     * Returns activities matching the user's current stress level and available time
     */
    @GetMapping("/recommend")
    public ResponseEntity<List<Activity>> getRecommended(
            @RequestParam int stress,
            @RequestParam(defaultValue = "60") int minutes) {
        return ResponseEntity.ok(activityService.getRecommended(stress, minutes));
    }

    /** POST /api/activities */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Activity activity) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(activityService.create(activity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** PUT /api/activities/{id} */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Activity activity) {
        try {
            return ResponseEntity.ok(activityService.update(id, activity));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** DELETE /api/activities/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        activityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
