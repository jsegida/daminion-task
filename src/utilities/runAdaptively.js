import wait from "./wait";

const LOADER_DELAY = 50;
const LOADER_MIN_DURATION = 500;

/**
 * @param result
 * @returns {{result, completed: boolean}}
 * @private
 */
const _markCompleted = result => ({
    result,
    completed: true
});

const _markIncompleted = () => ({});

export default async (run, showLoader) => {
    const promise = run();

    const { result, completed } = await Promise.race([
        wait(LOADER_DELAY).then(_markIncompleted),
        promise.then(_markCompleted)
    ]);

    if (completed) {
        return result;
    }

    showLoader();
    await wait(LOADER_MIN_DURATION);

    return promise;
};
