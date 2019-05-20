import { ADD_PRODUCTS } from "../constants";
import { ERROR, PENDING } from "../../constants";

const _convert = (result, { id, ...product }) => ({
    ...result,
    [id]: product
});

export default (state = PENDING, { type, payload, error }) => {
    if (type !== ADD_PRODUCTS || state === payload) {
        return state;
    }

    if (error) {
        return ERROR;
    }

    return payload.reduce ? {
        ...state instanceof Object && state,
        ...payload.reduce(_convert, {})
    } : payload;
};
