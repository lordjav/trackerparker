package dev.javiermeza.TrackerParker.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Data
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6)
    private String plate;

    private LocalDateTime entry;

    private LocalDateTime exit;

    private int charge;

    private String chargedBy;
}
