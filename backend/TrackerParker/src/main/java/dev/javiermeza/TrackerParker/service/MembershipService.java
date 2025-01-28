package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Membership;
import dev.javiermeza.TrackerParker.entity.MembershipBilled;
import dev.javiermeza.TrackerParker.entity.MembershipComment;

import java.util.List;

public interface MembershipService {

    Membership createMembership(Membership membership);

    List<Membership> getAllMembership();

    Membership getMembershipById(Long membershipId);

    List<Membership> getMembershipByClientId(String clientId);

    MembershipBilled createMembershipBill(Membership membership, String billedBy);

    List<MembershipBilled> getAllBillingsByMembershipId(Long membershipId);

    List<MembershipBilled> getAllBillingsByMembershipIdOrderByIdDesc(Long membershipId);

    List<MembershipComment> getMembershipCommentsByMembershipId(Long membershipId);
}
