package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Parking;

public interface ParkingService {

    Parking setEntry(Parking parking);

    Parking setExit(Parking parking);
}
