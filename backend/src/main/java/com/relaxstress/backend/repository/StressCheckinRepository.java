package com.relaxstress.backend.repository;

import com.relaxstress.backend.entity.StressCheckin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface StressCheckinRepository extends JpaRepository<StressCheckin, UUID> {
    List<StressCheckin> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<StressCheckin> findTop7ByUserIdOrderByCreatedAtDesc(UUID userId);
}
