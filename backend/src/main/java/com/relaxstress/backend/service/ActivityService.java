package com.relaxstress.backend.service;

import com.relaxstress.backend.entity.Activity;
import com.relaxstress.backend.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAll() {
        return activityRepository.findAll();
    }

    public Activity getById(String id) {
        return activityRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Activity not found: " + id));
    }

    public List<Activity> getByCategory(String category) {
        return activityRepository.findByCategoryIgnoreCase(category);
    }

    public List<Activity> getRecommended(int stressLevel, int availableMinutes) {
        return activityRepository.findByStressLevelAndAvailableTime(stressLevel, availableMinutes);
    }

    public List<Activity> getByStressLevel(int stressLevel) {
        return activityRepository.findByStressLevel(stressLevel);
    }

    public Activity create(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity update(String id, Activity updated) {
        Activity existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        existing.setDurationMinutes(updated.getDurationMinutes());
        existing.setMinStress(updated.getMinStress());
        existing.setMaxStress(updated.getMaxStress());
        existing.setCause(updated.getCause());
        existing.setInstructions(updated.getInstructions());
        return activityRepository.save(existing);
    }

    public void delete(String id) {
        activityRepository.deleteById(UUID.fromString(id));
    }
}
