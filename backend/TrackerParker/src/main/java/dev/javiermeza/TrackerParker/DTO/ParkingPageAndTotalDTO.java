package dev.javiermeza.TrackerParker.DTO;

import dev.javiermeza.TrackerParker.entity.Parking;
import org.springframework.data.domain.Page;

import java.util.List;

public class ParkingPageAndTotalDTO {

    private Page<Parking> parkingWithPagination;

    private Long totalElements;

    public ParkingPageAndTotalDTO(Page<Parking> parkingWithPagination, Long totalElements) {
        this.parkingWithPagination = parkingWithPagination;
        this.totalElements = totalElements;
    }

    public Page<Parking> getParkingWithPagination() {
        return parkingWithPagination;
    }

    public void setParkingWithPagination(Page<Parking> parkingWithPagination) {
        this.parkingWithPagination = parkingWithPagination;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }
}
