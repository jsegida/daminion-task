import addProducts from "./addProducts";
import { PENDING } from "../../constants";
import runAdaptively from "../../utilities/runAdaptively";
import createHandleable from "../../utilities/createHandleable";

export default ({ getProducts }) => {
    const _get = createHandleable(getProducts);

    const _getProducts = async dispatch =>
        dispatch(addProducts(await runAdaptively(_get, () => dispatch(addProducts(PENDING)))));

    return () => _getProducts;
};
