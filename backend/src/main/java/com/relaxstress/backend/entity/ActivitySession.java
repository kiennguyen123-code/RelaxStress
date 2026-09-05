package com.relaxstress.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "activity_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivitySession {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "user_id", columnDefinition = "uuid")
    private UUID userId;

    @Column(name = "checkin_id", columnDefinition = "uuid")
    private UUID checkinId;

    @Column(name = "activity_id", columnDefinition = "uuid")
    private UUID activityId;

    @Column(name = "stress_before")
    private Integer stressBefore;

    @Column(name = "stress_after")
    private Integer stressAfter;

    private Boolean completed;

    @Column(name = "created_at", columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (this.id == null) this.id = UUID.randomUUID();
        if (this.createdAt == null) this.createdAt = OffsetDateTime.now();
        if (this.completed == null) this.completed = false;
    }
}
