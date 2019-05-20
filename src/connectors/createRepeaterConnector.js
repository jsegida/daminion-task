export default ({ connectStore, repeat }) => connectStore({

    /**
     * @param dispatch {function}
     * @returns {{repeat: function}}
     */
    mapDispatchToProps: dispatch => ({
        repeat: () => dispatch(repeat())
    })
});
