import "./button.pcss";
import createElement from "../createElement";
import isFilled from "../isFilled";
import { DEFAULT } from "../../constants";

const _disableLoading = ({ currentTarget }) => {
    currentTarget.classList.remove("button_loading");
    currentTarget.removeEventListener("animationiteration", _disableLoading);
};

const createButton = ({ children, theme = DEFAULT, loading, disabled, handleClick }) => {
    let previousLoading = loading;
    let previousDisabled = disabled;

    const element = createElement("button", [
        "button",
        `button_${theme}`,
        loading && "button_loading"
    ].filter(isFilled));
    element.textContent = children;
    element.disabled = disabled;
    handleClick && element.addEventListener("click", handleClick);

    return {
        element,
        ...handleClick && {
            destroy: () => element.removeEventListener("click", handleClick)
        },
        update: ({ loading, disabled }) => {
            if (loading !== previousLoading) {
                previousLoading = loading;
                if (loading) {
                    element.classList.add("button_loading");
                } else {
                    element.addEventListener("animationiteration", _disableLoading)
                }
            }

            if (previousDisabled !== disabled) {
                previousDisabled = disabled;
                element.disabled = disabled;
            }
        }
    };
};

export default createButton;
