import createElement from "../createElement";
import "./radio-button.pcss";

const createRadioButton = ({ classNames = [], id, name, value, required, children, handleChange }, existingElement) => {
    let element;
    let input;

    if (existingElement) {
        element = existingElement;
        input = element.querySelector(".radio-button__input");
        input.checked && handleChange();
    } else {
        element = createElement("div", [
            "radio-button",
            ...classNames
        ]);

        input = createElement("input", [
            "radio-button__input"
        ]);

        input.id = id;
        input.name = name;
        input.type = "radio";
        input.value = value;
        input.required = required;
        element.appendChild(input);

        element.appendChild(children.element);
    }

    input.addEventListener("change", handleChange);

    return {
        element,
        destroy: () => input.removeEventListener("change", handleChange)
    }
};

export default createRadioButton;
