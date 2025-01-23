package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.MembershipBilled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipBilledRepository extends JpaRepository<MembershipBilled, Long>{

}
