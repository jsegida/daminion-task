export default ({ connectStore, change }) => connectStore({
    mapDispatchToProps: dispatch => ({
        change: value => dispatch(change(+value))
    })
});
