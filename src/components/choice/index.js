import createElement from "../createElement";
import "./choice.pcss";

const createChoiceBuilder = ({ createHighlightable }) => createHighlightable(({ classNames, number }) => {
    const _render = number => element.textContent = `Selected plan: #${number}`;

    const element = createElement("div", [
        "choice",
        ...classNames
    ]);
    _render(number);

    return {
        element,
        update: ({ number }) => _render(number)
    }
});

export default createChoiceBuilder;
