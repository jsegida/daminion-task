import { SET_AMOUNT } from "../constants";

export default (state = 1, { type, payload }) => type === SET_AMOUNT ? payload : state;
