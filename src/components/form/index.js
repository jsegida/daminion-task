import createElement from "../createElement";
import "./form.pcss";
import createChildConnector from "../createChildConnector";

const _createComponentBuilder = (className, createChild) => () => {
    const element = createElement("div", [
        className
    ]);

    const child = createChild();
    element.appendChild(child.element);

    return {
        ...child,
        element
    }
};

const _destroyComponents = ({ destroy }) => {
    destroy();
    return false;
};

const createFormBuilder = ({ createProduct, createAmount, createCost, createChoice, createFormFooter }) => {
    const _createFormAmount = _createComponentBuilder("form__amount", createAmount);
    const _createFormCost = _createComponentBuilder("form__cost", createCost);
    const _createFormChoice = _createComponentBuilder("form__choice", createChoice);

    return ({ products, productChosen, handleSubmit }) => {
        let components = [];
        let cost;
        let choice;
        let previousProductChosen = productChosen;

        const _addComponent = component => {
            components = [
                ...components,
                component
            ];
            return component;
        };

        const _renderCost = () => {
            cost = _addComponent(_createFormCost());
            element.insertBefore(cost.element, footer.element);
        };

        const _renderChoice = () => {
            choice = _createFormChoice();
            element.appendChild(choice.element);
        };

        const element = products.reduce(createChildConnector(product => _addComponent(createProduct({
            product
        })).element), createElement("form", [
            "form"
        ]));
        element.appendChild(_addComponent(_createFormAmount()).element);
        const footer = createFormFooter();
        element.appendChild(footer.element);
        
        if (productChosen) {
            _renderCost();
            _renderChoice();
        }

        element.addEventListener("submit", handleSubmit);

        return {
            element,
            update: ({ productChosen }) => {
                if (productChosen !== previousProductChosen) {
                    previousProductChosen = productChosen;
                    if (productChosen) {
                        _renderCost();
                        _renderChoice();
                    }
                    else {
                        cost.destroy();
                        cost.remove();
                        choice.destroy();
                        choice.remove();
                    }
                }
            },
            destroy: () => {
                components = components.filter(_destroyComponents);
                if (previousProductChosen) {
                    cost.destroy();
                    choice.destroy();
                }
                element.removeEventListener("submit", handleSubmit);
            }
        };
    };
};

export default createFormBuilder;
