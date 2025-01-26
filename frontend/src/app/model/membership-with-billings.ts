import { Membership } from "./membership";
import { MembershipBill } from "./membership-bill";

export interface MembershipWithBillings {
    membership: Membership,
    membershipBillings: Array<MembershipBill>
}
