import createElement from "../createElement";
import "./loader.pcss";
import createChildConnector from "../createChildConnector";

const _indexes = [
    "first",
    "second",
    "third"
];

const _addSquare = createChildConnector(index => {
    const square = document.createElement("span");
    square.classList.add("loader__square", `loader__square_${index}`);

    return square;
});

const createLoader = ({ classNames }) => ({
    element: _indexes.reduce(_addSquare, createElement("div", [
        "loader",
        ...classNames
    ]))
});

export default createLoader;
