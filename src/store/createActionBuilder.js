export default constant =>

    /**
     * @param payload
     * @returns {{payload: *, type: string, error?: boolean}}
     */
    payload => ({
        type: constant,
        payload,
        ...payload instanceof Error && {
            error: true
        }
    });
