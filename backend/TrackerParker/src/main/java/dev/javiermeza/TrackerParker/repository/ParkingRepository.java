package dev.javiermeza.TrackerParker.repository;

import dev.javiermeza.TrackerParker.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, Long> {


}
