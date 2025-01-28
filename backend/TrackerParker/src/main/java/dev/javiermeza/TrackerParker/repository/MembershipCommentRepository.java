package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.MembershipComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipCommentRepository extends JpaRepository<MembershipComment, Long> {

    List<MembershipComment> findByMembershipIdOrderByCreationDateDesc(Long membershipId);
}
