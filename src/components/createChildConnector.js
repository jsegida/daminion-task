export default convert => (element, value) => {
    element.appendChild(convert(value));
    return element;
};
