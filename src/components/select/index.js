import createElement from "../createElement";
import createChildConnector from "../createChildConnector";
import "./select.pcss";
import isFilled from "../isFilled";

const _addOption = createChildConnector(value => {
    const option = document.createElement("option");
    option.textContent = value;

    return option;
});

const createSelect = ({ classNames, name, labeled, children, handleChange }) => {
    const element = children.reduce(_addOption, createElement("select", [
        "select",
        labeled && "select_labeled",
        ...classNames
    ].filter(isFilled)));
    element.name = name;

    handleChange(element.value);
    element.addEventListener("change", ({ target: { value } }) => handleChange(value));

    return {
        element,
        destroy: () => element.removeEventListener("change", handleChange)
    }
};

export default createSelect;
