import { CHOOSE_PRODUCT } from "../constants";

export default (state = null, { type, payload }) => type === CHOOSE_PRODUCT ? payload : state;
