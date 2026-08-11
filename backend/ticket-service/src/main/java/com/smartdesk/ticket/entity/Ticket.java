package com.smartdesk.ticket.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    // OPEN, IN_PROGRESS, RESOLVED
    @Column(nullable = false)
    private String status = "OPEN";

    // LOW, MEDIUM, HIGH (AI will update this later)
    @Column(nullable = false)
    private String priority = "PENDING_AI";

    // Hardware, Software, Billing (AI will update this later)
    private String category = "UNASSIGNED";

    // AI will fill this in
    @Column(columnDefinition = "TEXT")
    private String suggestedReply;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
