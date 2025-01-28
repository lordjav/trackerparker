package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Parking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ParkingService {

    Parking createParking(Parking parking);

    Parking getParkingById(Long parkingId);

    Optional<Parking> getParkingByPlate(Parking parking);

    Parking invoiceParking(Parking parking);

    List<Parking> getActiveParking();

    Page<Parking> getAllParking(Pageable pageable);
}
