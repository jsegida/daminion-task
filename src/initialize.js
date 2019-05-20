import enablePromise from "./promise/enablePromise";
import createElement from "./components/createElement";

export default run => enablePromise(() => {
    const polyfills = [];

    if (!Object.entries) {
        polyfills.push(import(/* webpackChunkName: "object-entries" */ "core-js/features/object/entries"));
    }

    if (!window.fetch) {
        polyfills.push(import(/* webpackChunkName: "fetch" */ "whatwg-fetch"));
    }

    if (!Element.prototype.remove) {
        polyfills.push(import(/* webpackChunkName: "element-remove" */ "element-remove"));
    }

    if (!(window.Symbol && Symbol.iterator)) {
        polyfills.push(import(/* webpackChunkName: "symbol-iterator" */ "core-js/features/symbol/iterator"));
    }

    if (!Array.from) {
        polyfills.push(import(/* webpackChunkName: "array-from" */ "core-js/features/array/from"));
    }

    try {
        Object.keys(false);
    } catch (e) {
        if (e instanceof TypeError) {
            Object.keys = undefined;
            polyfills.push(import(/* webpackChunkName: "object-keys" */ "core-js/features/object/keys"));
        }
    }

    const { length } = createElement("div", [
        "a",
        "b"
    ]).classList;
    length < 2 && polyfills.push(import(/* webpackChunkName: "dom-token-list-add" */ "./utilities/addMultipleClasses"));

    return Promise.all(polyfills).then(run).catch(window.console.error);
});
