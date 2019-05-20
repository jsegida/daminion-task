import "./lettering.pcss";

const createLetterable = create => props => create({
    ...props,
    classNames: [
        "lettering"
    ]
});

export default createLetterable;
