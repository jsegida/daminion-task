const _convert = ([ id, product ]) => ({
    id,
    ...product
});

export default ({ connectStore, submit }) => connectStore({
    mapStateToProps: ({ products, chosenProduct }) => ({
        products: Object.entries(products).map(_convert),
        productChosen: !!chosenProduct
    }),

    /**
     * @param dispatch {function}
     * @returns {{handleSubmit: function}}
     */
    mapDispatchToProps: dispatch => ({
        handleSubmit: event => {
            event.preventDefault();
            dispatch(submit());
        }
    })
});
