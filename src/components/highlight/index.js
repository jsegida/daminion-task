import "./highlight.pcss";
import isFilled from "../isFilled";

export const MEDIUM = "md";

const createHighlightable = create => ({ size, ...props }) => create({
    ...props,
    classNames: [
        "highlight",
        size && `highlight_size_${size}`
    ].filter(isFilled)
});

export default createHighlightable;
