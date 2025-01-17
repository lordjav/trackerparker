package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Parking;
import dev.javiermeza.TrackerParker.repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ParkingServiceImpl implements ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    public Parking setEntry(Parking parking) {
        parking.setEntry(LocalDateTime.now());

        return parkingRepository.save(parking);
    }

    public Parking setExit(Parking parking) {
        parking.setExit(LocalDateTime.now());

        return parkingRepository.save(parking);
    }
}
