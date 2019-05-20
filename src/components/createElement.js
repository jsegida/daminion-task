export default (tag, classNames) => {
    const element = document.createElement(tag);
    element.classList.add(...classNames);

    return element;
}
