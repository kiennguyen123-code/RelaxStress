package com.relaxstress.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "stress_checkins")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StressCheckin {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "user_id", columnDefinition = "uuid")
    private UUID userId;

    @Column(length = 100)
    private String mood;

    @Column(name = "stress_level")
    private Integer stressLevel;

    @Column(length = 200)
    private String cause;

    @Column(name = "available_minutes")
    private Integer availableMinutes;

    @Column(name = "created_at", columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (this.id == null) this.id = UUID.randomUUID();
        if (this.createdAt == null) this.createdAt = OffsetDateTime.now();
    }
}
