package dev.javiermeza.TrackerParker.DTO;

public class BillMembershipDTO {

    private Long membershipId;

    private String billedBy;

    // Getters and Setters


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
}
