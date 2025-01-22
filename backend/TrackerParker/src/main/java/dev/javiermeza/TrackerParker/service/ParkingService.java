package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Parking;

import java.util.List;
import java.util.Optional;

public interface ParkingService {

    Parking createParking(Parking parking);

    List<Parking> getAllParking();

    Parking getParkingById(Long parkingId);

    Optional<Parking> getParkingByPlate(Parking parking);

    Parking invoiceParking(Parking parking);

    List<Parking> getActiveParking();
}
