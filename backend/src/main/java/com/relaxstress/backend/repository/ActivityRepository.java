package com.relaxstress.backend.repository;

import com.relaxstress.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    List<Activity> findByCategory(String category);

    List<Activity> findByCategoryIgnoreCase(String category);

    // Find activities suitable for a given stress level
    @Query("SELECT a FROM Activity a WHERE a.minStress <= :stress AND a.maxStress >= :stress")
    List<Activity> findByStressLevel(@Param("stress") int stressLevel);

    // Find activities within available time
    @Query("SELECT a FROM Activity a WHERE a.durationMinutes <= :minutes ORDER BY a.durationMinutes DESC")
    List<Activity> findByAvailableTime(@Param("minutes") int availableMinutes);

    // Find activities by both stress level and available time
    @Query("SELECT a FROM Activity a WHERE a.minStress <= :stress AND a.maxStress >= :stress AND a.durationMinutes <= :minutes")
    List<Activity> findByStressLevelAndAvailableTime(@Param("stress") int stressLevel, @Param("minutes") int availableMinutes);
}
