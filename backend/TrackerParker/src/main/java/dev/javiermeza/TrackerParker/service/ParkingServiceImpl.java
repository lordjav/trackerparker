package dev.javiermeza.TrackerParker.service;

import dev.javiermeza.TrackerParker.entity.Parking;
import dev.javiermeza.TrackerParker.repository.ParkingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingServiceImpl implements ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    public Parking createParking(Parking parking) {

        parking.setEntryTime(new Date());
        parking.setCharge(0);

        if (parking.getPlate() == null || parking.getPlate().trim().isEmpty()) {
            throw new IllegalArgumentException("La placa no puede estar vacía");
        }
        return parkingRepository.save(parking);
    }

    /*public List<Parking> getAllParking() {
        return parkingRepository.findAll(Sort.by(Sort.Direction.DESC, "entryTime"));
    }*/

    public Page<Parking> getAllParking(Pageable pageable) {
        return parkingRepository.findAllByOrderByEntryTimeDesc(pageable);
    }

    public Parking getParkingById(Long parkingId) {
        Optional<Parking> optionalParking = parkingRepository.findById(parkingId);
        if (optionalParking.isPresent()) {
            return optionalParking.get();
        } else {
            throw new EntityNotFoundException("No existe registro de parqueo con este ID.");
        }
    }

    public Optional<Parking> getParkingByPlate(Parking parking) {
        return parkingRepository.findFirstByPlateOrderByIdDesc(parking.getPlate());
    }

    public Parking invoiceParking(Parking parking) {
        Optional<Parking> parkingToInvoice = parkingRepository.findById(parking.getId());
        if (parkingToInvoice.isPresent()) {
            parking.setExitTime(new Date());
            long timeInParking = parking.getExitTime().getTime() - parking.getEntryTime().getTime();
            int charge = (int) (timeInParking / 60000);
            parking.setCharge(charge);
            return parkingRepository.save(parking);
        } else {
            throw new EntityNotFoundException("Desapareció este registro de la base de datos.");
        }
    }

    public List<Parking> getActiveParking() {
        return parkingRepository.findByExitTimeIsNull();
    }
}
