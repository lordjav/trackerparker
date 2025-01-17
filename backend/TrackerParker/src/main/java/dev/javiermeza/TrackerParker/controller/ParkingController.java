package dev.javiermeza.TrackerParker.controller;

import dev.javiermeza.TrackerParker.entity.Parking;
import dev.javiermeza.TrackerParker.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("parking")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping
    public ResponseEntity<?> registerEntry (@RequestBody Parking parking) {
        try {
            Parking newEntry = parkingService.setEntry(parking);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
