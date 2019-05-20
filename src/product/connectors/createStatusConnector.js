export default ({ connectStore }) => connectStore({
    mapStateToProps: ({ orderStatus: status }) => ({
        status
    })
});
