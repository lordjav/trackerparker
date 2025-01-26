package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.MembershipBilled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipBilledRepository extends JpaRepository<MembershipBilled, Long>{

    List<MembershipBilled> findAllByMembershipId(Long membershipId);

    List<MembershipBilled> findAllByMembershipIdOrderByIdDesc(Long membershipId);
}
