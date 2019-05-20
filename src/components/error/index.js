import createElement from "../createElement";
import "./error.pcss";

const createErrorBuilder = ({ createButton }) => ({ classNames, repeat }) => {
    const element = createElement("div", [
        "error",
        ...classNames
    ]);

    const message = createElement("div", [
        "error__message"
    ]);
    message.textContent = "Oops! Failed to get the\u00a0products\u00a0list!";
    element.appendChild(message);

    const button = createButton({
        children: "Try again",
        handleClick: repeat
    });
    element.appendChild(button.element);

    return {
        element,
        destroy: () => button.destroy()
    };
};

export default createErrorBuilder;
