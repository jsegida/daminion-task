import { ERROR, PENDING } from "../../constants";

const _removeComponent = ({ element, destroy }) => {
    destroy && destroy();
    element.remove();

    return false;
};

const _convert = child => ({
    element: child
});

export default ({ createLoader, createError, createForm }) => ({ status }, existingElement) => {
    let previousStatus = status;
    let components = [...existingElement.children].map(_convert);

    const _appendComponent = component => {
        components = [
            ...components,
            component
        ];
        existingElement.appendChild(component.element);
    };

    return {
        element: existingElement,
        update: ({ status }) => {
            if (status === previousStatus) {
                return;
            }

            previousStatus = status;
            components = components.filter(_removeComponent);

            if (status === PENDING) {
                _appendComponent(createLoader({
                    classNames: [
                        "container__loader"
                    ]
                }));
            } else if (status === ERROR) {
                _appendComponent(createError({
                    classNames: [
                        "container__error"
                    ]
                }));
            } else {
                _appendComponent(createForm())
            }
        }
    };
};
