package dev.javiermeza.TrackerParker.enums;

public enum chargeValue {
    BIKE_FRACTION(0),
    BIKE_HOUR(0),
    BIKE_DAY(0),

    MOTORCYCLE_FRACTION(0),
    MOTORCYCLE_HOUR(0),
    MOTORCYCLE_DAY(0),

    CART_FRACTION(0),
    CART_HOUR(0),
    CART_DAY(0),

    ATV_FRACTION(0),
    ATV_HOUR(0),
    ATV_DAY(0),

    CAR_FRACTION(0),
    CAR_HOUR(0),
    CAR_DAY(0);

    private final int chargeValue;


    chargeValue(int chargeValue) {
        this.chargeValue = chargeValue;
    }
}
