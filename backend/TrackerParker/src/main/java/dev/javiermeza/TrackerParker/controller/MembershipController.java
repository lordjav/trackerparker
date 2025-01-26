package dev.javiermeza.TrackerParker.controller;

import dev.javiermeza.TrackerParker.DTO.BillMembershipDTO;
import dev.javiermeza.TrackerParker.DTO.MembershipWithBillingsDTO;
import dev.javiermeza.TrackerParker.entity.Membership;
import dev.javiermeza.TrackerParker.entity.MembershipBilled;
import dev.javiermeza.TrackerParker.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/membership")
@CrossOrigin(origins = "http://localhost:4200/")
public class MembershipController {

    @Autowired
    private MembershipService membershipService;

    @PostMapping
    public ResponseEntity<?> createMembership (@RequestBody Membership membership) {
        try {
            Membership newEntry = membershipService.createMembership(membership);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Membership>> getAllMemberships() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(membershipService.getAllMembership());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/bill")
    public ResponseEntity<?> billMembership(@RequestBody BillMembershipDTO billMembershipDTO) {
        try {
            Long membershipId = billMembershipDTO.getMembershipId();
            String billedBy = billMembershipDTO.getBilledBy();

            Membership retrievedMembership = membershipService.getMembershipById(membershipId);

            MembershipBilled membershipBilled = membershipService.createMembershipBill(retrievedMembership, billedBy);
            return ResponseEntity.status(HttpStatus.CREATED).body(membershipBilled);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @GetMapping("/{membershipId}")
    public ResponseEntity<?> getMembershipWithBillings(@PathVariable Long membershipId) {
        try {
            Membership membership = membershipService.getMembershipById(membershipId);
            List<MembershipBilled> membershipBilledList = membershipService.getAllBillingsByMembershipIdOrderByIdDesc(membershipId);

            MembershipWithBillingsDTO membershipWithBillings = new MembershipWithBillingsDTO(membership, membershipBilledList);
            return ResponseEntity.status(HttpStatus.OK).body(membershipWithBillings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error al procesar la solicitud: " + e.getMessage());
        }
    }
}
