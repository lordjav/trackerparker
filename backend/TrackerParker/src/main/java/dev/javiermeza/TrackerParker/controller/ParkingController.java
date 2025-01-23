package dev.javiermeza.TrackerParker.controller;

import dev.javiermeza.TrackerParker.entity.Parking;
import dev.javiermeza.TrackerParker.service.ParkingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parking")
@CrossOrigin(origins = "http://localhost:4200/")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping
    public ResponseEntity<?> fetchParking (@RequestBody Parking parking) {
        try {
            Optional<Parking> possibleParking = parkingService.getParkingByPlate(parking);
            if (possibleParking.isEmpty() || possibleParking.get().getExitTime() != null) {
                    Parking newEntry = parkingService.createParking(parking);
                    return ResponseEntity.status(HttpStatus.CREATED).body(newEntry);
            } else {
                return ResponseEntity.ok(possibleParking.get());
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Parking>> getAllParking() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(parkingService.getAllParking());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Parking>> getActiveParking() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(parkingService.getActiveParking());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{parkingId}")
    public ResponseEntity<?> getParkingById(@PathVariable Long parkingId) {
        try {
            Parking parking = parkingService.getParkingById(parkingId);
            return ResponseEntity.ok(parking);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/invoice")
    public ResponseEntity<?> invoiceParking(@RequestBody Parking parking) {
        try {
            Parking invoicingParking = parkingService.invoiceParking(parking);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(parking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error del servidor: no fue facturado el servicio. " + e.getMessage());
        }
    }
}
