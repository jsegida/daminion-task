import createElement from "../createElement";
import "./product.pcss";
import { LARGE } from './../../constants';

const _createProductName = ({ classNames, children }) => {
    const element = createElement("span", [
        "product__name",
        ...classNames
    ]);
    element.textContent = children;

    return {
        element
    }
};

const createProductBuilder = ({ createLetterable, createRadioButtonLabel, createRadioButton }) => {
    const _createLetterableProductName = createLetterable(_createProductName);
    return ({ product: { id, name, description }, change }) => {
        const radioButtonName = "product";
        const radioButtonId = `${radioButtonName}${id}`;

        const price = createElement("span", [
            "product__price"
        ]);
        price.textContent = description;
        
        return createRadioButton({
            classNames: [
                "product"
            ],
            id: radioButtonId,
            name: radioButtonName,
            value: id,
            required: true,
            children: createRadioButtonLabel({
                classNames: [
                    "product__label"
                ],
                id: radioButtonId,
                size: LARGE,
                children: [
                    _createLetterableProductName({
                        children: name
                    }),
                    price
                ]
            }),
            handleChange: () => change(id)
        });
    };
};

export default createProductBuilder;
