package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, Long> {

    Optional<Parking> findFirstByPlateOrderByIdDesc(String plate);

    List<Parking> findByExitTimeIsNull();
}
