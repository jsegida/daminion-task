import createElement from "../createElement";
import "./amount.pcss";

const options = "1 2 3 4 5 6 7 8 9 10".split(" ");

const createAmountBuilder = ({ createSelect }) => ({ change }) => {
    const element = createElement("div", [
        "amount"
    ]);

    const label = document.createElement("label");
    label.textContent = "Number of licenses:";
    element.appendChild(label);

    const select = createSelect({
        classNames: [
            "amount__select"
        ],
        name: "amount",
        labeled: true,
        children: options,
        handleChange: change
    });
    label.appendChild(select.element);

    return {
        element,
        destroy: select.destroy
    }
};

export default createAmountBuilder;
