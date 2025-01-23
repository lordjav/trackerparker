package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    List<Membership> findByClientId(String clientId);
}
