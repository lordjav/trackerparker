package dev.javiermeza.TrackerParker.enums;

public enum membershipValue {
    // BIKE
    BIKE_WEEKLY("bicicleta", "semanal", 13000),
    BIKE_BIWEEKLY("bicicleta", "quincenal", 24000),
    BIKE_MONTHLY("bicicleta", "mensual", 40000),
    BIKE_BIMONTHLY("bicicleta", "bimestral", 80000),
    BIKE_TRIMONTHLY("bicicleta", "trimestral", 120000),
    BIKE_BIANNUAL("bicicleta", "semestral", 240000),
    BIKE_ANNUAL("bicicleta", "anual", 480000),

    // MOTORCYCLE
    MOTORCYCLE_WEEKLY("motocicleta", "semanal", 26000),
    MOTORCYCLE_BIWEEKLY("motocicleta", "quincenal", 40000),
    MOTORCYCLE_MONTHLY("motocicleta", "mensual", 48000),
    MOTORCYCLE_BIMONTHLY("motocicleta", "bimestral", 96000),
    MOTORCYCLE_TRIMONTHLY("motocicleta", "trimestral", 144000),
    MOTORCYCLE_BIANNUAL("motocicleta", "semestral", 288000),
    MOTORCYCLE_ANNUAL("motocicleta", "anual", 576000),

    // CART
    CART_WEEKLY("carreta", "semanal", 52000),
    CART_BIWEEKLY("carreta", "quincenal", 80000),
    CART_MONTHLY("carreta", "mensual", 96000),
    CART_BIMONTHLY("carreta", "bimestral", 192000),
    CART_TRIMONTHLY("carreta", "trimestral", 288000),
    CART_BIANNUAL("carreta", "semestral", 576000),
    CART_ANNUAL("carreta", "anual", 1152000),

    // ATV
    ATV_WEEKLY("cuatrimoto", "semanal", 52000),
    ATV_BIWEEKLY("cuatrimoto", "quincenal", 80000),
    ATV_MONTHLY("cuatrimoto", "mensual", 96000),
    ATV_BIMONTHLY("cuatrimoto", "bimestral", 192000),
    ATV_TRIMONTHLY("cuatrimoto", "trimestral", 288000),
    ATV_BIANNUAL("cuatrimoto", "semestral", 576000),
    ATV_ANNUAL("cuatrimoto", "anual", 1152000),

    // CAR
    CAR_WEEKLY("carro", "semanal", 80000),
    CAR_BIWEEKLY("carro", "quincenal", 120000),
    CAR_MONTHLY("carro", "mensual", 150000),
    CAR_BIMONTHLY("carro", "bimestral", 300000),
    CAR_TRIMONTHLY("carro", "trimestral", 450000),
    CAR_BIANNUAL("carro", "semestral", 900000),
    CAR_ANNUAL("carro", "anual", 1800000);

    private final String vehicleType;
    private final String periodicity;
    private final int membershipValue;

    membershipValue(String vehicleType, String periodicity, int membershipValue) {
        this.vehicleType = vehicleType;
        this.periodicity = periodicity;
        this.membershipValue = membershipValue;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public String getPeriodicity() {
        return periodicity;
    }

    public int getMembershipValue() {
        return membershipValue;
    }

    public static int getMembershipValueByTypeAndPeriod(String vehicleType, String periodicity) {
        for (membershipValue value : values()) {
            if (value.vehicleType.equalsIgnoreCase(vehicleType) && value.periodicity.equalsIgnoreCase(periodicity)) {
                return value.membershipValue;
            }
        }
        throw new IllegalArgumentException("Tipo de vehículo o periodicidad errónea.");
    }
}
