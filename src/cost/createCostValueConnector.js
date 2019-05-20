export default ({ connectStore }) => connectStore({
    mapStateToProps: ({ chosenProduct, products: { [chosenProduct]: { price } }, amount }) => ({
        value: price * amount
    })
});
