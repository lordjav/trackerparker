package dev.javiermeza.TrackerParker.enums;

public enum chargeValue {
    // BIKE
    BIKE_FRACTION("BIKE", "FRACTION", 500),
    BIKE_HOUR("BIKE", "HOUR", 800),
    BIKE_DAY("BIKE", "DAY", 3500),

    // MOTORCYCLE
    MOTORCYCLE_FRACTION("MOTORCYCLE", "FRACTION", 1000),
    MOTORCYCLE_HOUR("MOTORCYCLE", "HOUR", 1600),
    MOTORCYCLE_DAY("MOTORCYCLE", "DAY", 7000),

    // CART
    CART_FRACTION("CART", "FRACTION", 1800),
    CART_HOUR("CART", "HOUR", 3600),
    CART_DAY("CART", "DAY", 12000),

    // ATV
    ATV_FRACTION("ATV", "FRACTION", 1800),
    ATV_HOUR("ATV", "HOUR", 3600),
    ATV_DAY("ATV", "DAY", 12000),

    // CAR
    CAR_FRACTION("CAR", "FRACTION", 2000),
    CAR_HOUR("CAR", "HOUR", 4500),
    CAR_DAY("CAR", "DAY", 20000);

    private final String vehicleType;
    private final String periodicity;
    private final int chargeValue;


    chargeValue(String vehicleType, String periodicity, int chargeValue) {
        this.vehicleType = vehicleType;
        this.periodicity = periodicity;
        this.chargeValue = chargeValue;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public String getPeriodicity() {
        return periodicity;
    }

    public int getChargeValue() {
        return chargeValue;
    }

    public static int getChargeValueByTypeAndPeriod(String vehicleType, String periodicity) {
        for (chargeValue value : values()) {
            if (value.vehicleType.equalsIgnoreCase(vehicleType) && value.periodicity.equalsIgnoreCase(periodicity)) {
                return value.chargeValue;
            }
        }
        throw new IllegalArgumentException("No se encontró un enum para vehicleType: " + vehicleType + " y periodicity: " + periodicity);
    }
}
