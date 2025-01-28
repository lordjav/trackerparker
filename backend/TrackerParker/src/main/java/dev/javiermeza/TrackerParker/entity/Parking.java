package dev.javiermeza.TrackerParker.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String plate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date entryTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date exitTime;

    private int charge;

    private String chargedBy;

    private String comment;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public Date getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(Date entryTime) {
        this.entryTime = entryTime;
    }

    public Date getExitTime() {
        return exitTime;
    }

    public void setExitTime(Date exitTime) {
        this.exitTime = exitTime;
    }

    public int getCharge() {
        return charge;
    }

    public void setCharge(int charge) {
        this.charge = charge;
    }

    public String getChargedBy() {
        return chargedBy;
    }

    public void setChargedBy(String chargedBy) {
        this.chargedBy = chargedBy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment() {
        this.comment = comment;
    }

}
