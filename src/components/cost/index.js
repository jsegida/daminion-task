import createElement from "../createElement";

const createCostBuilder = ({ createLetterable, createCostValue }) => createLetterable(({ classNames }) => {
    const element = createElement("div", [
        "cost",
        ...classNames
    ]);

    const total = document.createElement("span");
    total.textContent = "Total:";
    element.appendChild(total);

    const valueComponent = createCostValue();
    element.appendChild(valueComponent.element);

    return {
        element,
        destroy: valueComponent.destroy
    }
});

export default createCostBuilder;
