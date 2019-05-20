import createElement from "../createElement";
import "./cost.pcss";

export default ({ createHighlightable }) => createHighlightable(({ classNames, value }) => {
    let previousValue = value;

    const element = createElement("span", [
        "cost__value",
        ...classNames
    ]);
    element.textContent = `$${value}`;

    const country = createElement("span", [
        "cost__country"
    ]);
    country.textContent = "US";
    element.appendChild(country);

    return {
        element,
        update: ({ value }) => {
            if (previousValue !== value) {
                previousValue = value;
                element.childNodes[0].textContent = `$${value}`;
            }
        }
    }
});
