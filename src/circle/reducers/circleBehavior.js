import { CHANGE_BEHAVIOR } from "../constants";

export default (state = null, { type, payload }) => type === CHANGE_BEHAVIOR ? payload : state;
