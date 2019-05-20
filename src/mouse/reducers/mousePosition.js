import { MOVE_MOUSE } from "../constants";

export default (state = {}, { type, payload }) =>
    type === MOVE_MOUSE && !(state.x === payload.x && state.y === payload.y) ? payload : state;
