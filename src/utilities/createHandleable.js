export default run => async (...args) => {
    try {
        return await run(...args);
    } catch (e) {
        return e;
    }
};
