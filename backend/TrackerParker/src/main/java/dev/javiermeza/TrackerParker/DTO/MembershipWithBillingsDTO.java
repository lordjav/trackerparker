package dev.javiermeza.TrackerParker.DTO;

import dev.javiermeza.TrackerParker.entity.Membership;
import dev.javiermeza.TrackerParker.entity.MembershipBilled;
import dev.javiermeza.TrackerParker.entity.MembershipComment;

import java.util.List;

public class MembershipWithBillingsDTO {

    private Membership membership;

    private List<MembershipBilled> membershipBillings;

    private List<MembershipComment> membershipComments;

    public MembershipWithBillingsDTO(
            Membership membership,
            List<MembershipBilled> membershipBillings,
            List<MembershipComment> membershipComments
    ) {
       this.membership = membership;
       this.membershipBillings = membershipBillings;
       this.membershipComments = membershipComments;
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

    public List<MembershipComment> getMembershipComments() {
        return membershipComments;
    }

    public void setMembershipComments(List<MembershipComment> membershipComments) {
        this.membershipComments = membershipComments;
    }
}
