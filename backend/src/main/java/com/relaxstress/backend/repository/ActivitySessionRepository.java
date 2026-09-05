package com.relaxstress.backend.repository;

import com.relaxstress.backend.entity.ActivitySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ActivitySessionRepository extends JpaRepository<ActivitySession, UUID> {
    List<ActivitySession> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<ActivitySession> findByUserIdAndCompleted(UUID userId, Boolean completed);
    long countByUserIdAndCompleted(UUID userId, Boolean completed);
}
