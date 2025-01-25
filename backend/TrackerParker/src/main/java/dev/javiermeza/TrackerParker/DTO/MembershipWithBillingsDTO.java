package dev.javiermeza.TrackerParker.DTO;

import dev.javiermeza.TrackerParker.entity.Membership;
import dev.javiermeza.TrackerParker.entity.MembershipBilled;

import java.util.List;

public class MembershipWithBillingsDTO {

    private Membership membership;

    private List<MembershipBilled> membershipBillings;

    public MembershipWithBillingsDTO(
            Membership membership,
            List<MembershipBilled> membershipBillings
    ) {
       this.membership = membership;
       this.membershipBillings = membershipBillings;
    }

    // Getters and Setters
    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public List<MembershipBilled> getMembershipBillings() {
        return membershipBillings;
    }

    public void setMembershipBillings(List<MembershipBilled> membershipBillings) {
        this.membershipBillings = membershipBillings;
    }
}
