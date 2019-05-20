import runAdaptively from "../../utilities/runAdaptively";
import createHandleable from "../../utilities/createHandleable";
import { PENDING } from "../../constants";
import setOrderStatus from "./setOrderStatus";

export default ({ order }) => {
    const _order = createHandleable(order);

    const _submit = async (dispatch, getState) => {
        const { chosenProduct: productId, amount } = getState();

        return dispatch(setOrderStatus(await runAdaptively(() => _order({
            productId,
            amount
        }), () => dispatch(setOrderStatus(PENDING)))));
    };

    return () => _submit;
};
