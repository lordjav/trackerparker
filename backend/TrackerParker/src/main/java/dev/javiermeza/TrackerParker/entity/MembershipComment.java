package dev.javiermeza.TrackerParker.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class MembershipComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long membershipId;

    private String content;

    private Long idPostedBy;

    private Date creationDate;

    // Getters and Setters

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getIdPostedBy() {
        return idPostedBy;
    }

    public void setIdPostedBy(Long idPostedBy) {
        this.idPostedBy = idPostedBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}
