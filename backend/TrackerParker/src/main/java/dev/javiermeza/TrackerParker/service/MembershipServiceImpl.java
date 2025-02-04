package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.*;
import dev.javiermeza.TrackerParker.enums.membershipValue;
import dev.javiermeza.TrackerParker.repository.MembershipBilledRepository;
import dev.javiermeza.TrackerParker.repository.MembershipCommentRepository;
import dev.javiermeza.TrackerParker.repository.MembershipRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipServiceImpl implements MembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private MembershipBilledRepository membershipBilledRepository;

    @Autowired
    private MembershipCommentRepository membershipCommentRepository;

    public Membership createMembership(Membership membership) {
        if (membership.getPlate() == null || membership.getPlate().trim().isEmpty()) {
            throw new IllegalArgumentException("La placa no puede estar vacía");
        }
        int membershipFee = membershipValue.getMembershipValueByTypeAndPeriod(membership.getVehicleType(), membership.getPeriodicity());
        membership.setFee(membershipFee);
        return membershipRepository.save(membership);
    }

    public List<Membership> getAllMembership() {
        return membershipRepository.findAll();
    }

    public Membership getMembershipById(Long membershipId) {
        Optional<Membership> optionalMembership = membershipRepository.findById(membershipId);
        if (optionalMembership.isPresent()) {
            return optionalMembership.get();
        } else {
            throw new EntityNotFoundException("No existe membresía con este ID.");
        }
    }

    public List<Membership> getMembershipByClientId(String clientId) {
        return membershipRepository.findByClientId(clientId);
    }

    public MembershipBilled createMembershipBill(MembershipBilled membershipBilled) {

        membershipBilled.setBillingDate(new Date());
        return membershipBilledRepository.save(membershipBilled);
    }

    public List<MembershipBilled> getAllBillingsByMembershipId(Long membershipId) {
        return membershipBilledRepository.findAllByMembershipId(membershipId);
    }

    public List<MembershipBilled> getAllBillingsByMembershipIdOrderByIdDesc(Long membershipId) {
        return membershipBilledRepository.findAllByMembershipIdOrderByIdDesc(membershipId);
    }

    public List<MembershipComment> getMembershipCommentsByMembershipId(Long membershipId) {
        return membershipCommentRepository.findByMembershipIdOrderByCreationDateDesc(membershipId);
    }
}
