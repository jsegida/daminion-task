export default ({ connectStore }) => connectStore({
    mapStateToProps: ({ circleBehavior: behavior, mousePosition }) => ({
        behavior,
        mousePosition
    })
});
