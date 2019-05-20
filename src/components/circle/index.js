const createCircleBuilder = ({ createCircleInnerSpace }) => element => {
    const loader = element.querySelector(".circle__loader");
    const props = {
        circle: {
            radius: loader.offsetWidth / 2,
            color: getComputedStyle(loader).backgroundColor
        }
    };
    loader.remove();

    const innerSpace = createCircleInnerSpace(props, element.querySelector(".circle__inner-space"));
    innerSpace.initialize();

    return {
        element,
        destroy: () => innerSpace.destroy()
    }
};

export default createCircleBuilder;
