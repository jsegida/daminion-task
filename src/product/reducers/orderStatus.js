import { SET_ORDER_STATUS } from "../constants";
import { ERROR, PENDING, SUCCESS } from "../../constants";

export default (state = null, { type, error, payload }) => {
    if (type !== SET_ORDER_STATUS) {
        return state;
    } else if (error) {
        return ERROR;
    }

    return payload === PENDING ? payload : SUCCESS;
};
