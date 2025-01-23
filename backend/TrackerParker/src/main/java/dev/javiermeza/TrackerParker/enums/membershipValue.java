package dev.javiermeza.TrackerParker.enums;

public enum membershipValue {
    BIKE_WEEKLY(0),
    BIKE_2WEEKS(0),
    BIKE_MONTHLY(0),
    BIKE_BIMONTHLY(0),
    BIKE_TRIMONTHLY(0),
    BIKE_BIANNUAL(0),
    BIKE_ANNUAL(0),

    MOTORCYCLE_WEEKLY(0),
    MOTORCYCLE_2WEEKS(0),
    MOTORCYCLE_MONTHLY(0),
    MOTORCYCLE_BIMONTHLY(0),
    MOTORCYCLE_TRIMONTHLY(0),
    MOTORCYCLE_BIANNUAL(0),
    MOTORCYCLE_ANNUAL(0),

    CART_WEEKLY(0),
    CART_2WEEKS(0),
    CART_MONTHLY(0),
    CART_BIMONTHLY(0),
    CART_TRIMONTHLY(0),
    CART_BIANNUAL(0),
    CART_ANNUAL(0),

    ATV_WEEKLY(0),
    ATV_2WEEKS(0),
    ATV_MONTHLY(0),
    ATV_BIMONTHLY(0),
    ATV_TRIMONTHLY(0),
    ATV_BIANNUAL(0),
    ATV_ANNUAL(0),

    CAR_WEEKLY(0),
    CAR_2WEEKS(0),
    CAR_MONTHLY(0),
    CAR_BIMONTHLY(0),
    CAR_TRIMONTHLY(0),
    CAR_BIANNUAL(0),
    CAR_ANNUAL(0);

    private final int membershipValue;

    membershipValue(int membershipValue) {
        this.membershipValue = membershipValue;
    }
}
