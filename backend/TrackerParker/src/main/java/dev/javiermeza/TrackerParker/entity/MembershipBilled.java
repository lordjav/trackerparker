package dev.javiermeza.TrackerParker.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class MembershipBilled {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long membershipId;

    private String billedBy;

    private Date billingDate;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(Long membershipId) {
        this.membershipId = membershipId;
    }

    public String getBilledBy() {
        return billedBy;
    }

    public void setBilledBy(String billedBy) {
        this.billedBy = billedBy;
    }

    public Date getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(Date billingDate) {
        this.billingDate = billingDate;
    }
}
