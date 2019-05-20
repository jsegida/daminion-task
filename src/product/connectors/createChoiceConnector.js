export default ({ connectStore }) => connectStore({
    mapStateToProps: ({ chosenProduct }) => ({
        number: chosenProduct
    })
});
