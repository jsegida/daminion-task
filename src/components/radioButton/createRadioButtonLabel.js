import createElement from "../createElement";
import createChildConnector from "../createChildConnector";
import { DEFAULT } from "../../constants";

const _addChild = createChildConnector(child => child.element || child);

export default ({ classNames, id, size = DEFAULT, children }) => {
    const element = children.reduce(_addChild, createElement("label", [
        "radio-button__label",
        `radio-button__label_size_${size}`,
        ...classNames
    ]));
    element.htmlFor = id;

    return {
        element
    }
};
