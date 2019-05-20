import createElement from "../createElement";
import { ERROR, PENDING, PRIMARY } from "../../constants";

const _createButtonProps = status => {
    const loading = status === PENDING;
    return ({
        loading,
        disabled: loading
    });
};

export default ({ createButton }) => ({ status }) => {
    let previousStatus = status;
    let error;

    const element = createElement("div", [
        "form__footer"
    ]);

    const button = createButton({
        ..._createButtonProps(status),
        children: "Buy now",
        theme: PRIMARY
    });
    element.appendChild(button.element);

    return {
        element,
        update: ({ status }) => {
            if (status === previousStatus) {
                return;
            }

            button.update(_createButtonProps(status));

            if (status === ERROR) {
                error = createElement("div", [
                    "form__error"
                ]);
                error.textContent = "Oops! Failed to order, try\u00a0again...";
                element.appendChild(error);
            } else if (previousStatus === ERROR) {
                error.remove();
            }

            previousStatus = status;
        }
    }
}
