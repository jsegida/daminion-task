import "./components/page.pcss";
import "./components/header.pcss";
import "./components/h.pcss";
import "./components/h1.pcss";
import "./components/container/container.pcss";
import "./components/circle/circle.pcss";
import createStore from "./store";
import createProductsGetter from "./product/actions/createProductsGetter";
import products from "./product/reducers/products";
import createOrderContainerBuilder from "./components/container/createOrderContainerBuilder";
import getStatus from "./product/selectors/getStatus";
import chosenProduct from "./product/reducers/chosenProduct";
import amount from "./amount/reducers/amount";
import orderStatus from "./product/reducers/orderStatus";
import createCircleBuilder from "./components/circle";
import createRadioButton from "./components/radioButton";
import changeBehavior from "./circle/actions/changeBehavior";
import circleBehavior from "./circle/reducers/circleBehavior";
import moveMouse from "./mouse/actions/moveMouse";
import mousePosition from "./mouse/reducers/mousePosition";
import getProducts from "./product/repository/getProducts";
import { ESCAPE, FOLLOW } from "./constants";
import configureOrderContainer from "./configuration/configureOrderContainer";
import configureCircle from "./configuration/configureCircle";

// noinspection JSUnusedGlobalSymbols
export default () => {
    const { connect: connectStore, getState, subscribe, dispatch } = createStore({
        products,
        chosenProduct,
        amount,
        orderStatus,
        circleBehavior,
        mousePosition
    });

    const _getProducts = createProductsGetter({
        getProducts
    });
    const createOrderContainer = createOrderContainerBuilder(configureOrderContainer({
        connectStore,
        getProducts: _getProducts
    }));
    const { update: updateOrderContainer } = createOrderContainer(
        getStatus(getState()),
        document.getElementById("orderContainer")
    );
    subscribe(state => updateOrderContainer(getStatus(state)));
    dispatch(_getProducts());

    const createHandler = behavior => () => dispatch(changeBehavior(behavior));
    addEventListener("mousemove", ({ pageX, pageY }) => dispatch(moveMouse({
        x: pageX,
        y: pageY
    })));
    createRadioButton({
        handleChange: createHandler(FOLLOW)
    }, document.getElementById("followRadioButton"));
    createRadioButton({
        handleChange: createHandler(ESCAPE)
    }, document.getElementById("escapeRadioButton"));
    const createCircle = createCircleBuilder(configureCircle({
        connectStore
    }));
    createCircle(document.getElementById("circle"));
};
