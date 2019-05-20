const _throwError = () => {
    throw new Error("Failed to get Promise polyfill!");
};

export default run => {
    if (window.Promise) {
        return run();
    }

    const request = new XMLHttpRequest();
    request.onload = ({ target: { status, response } }) => {
        if (status >= 400) {
            throw new Error("Failed to get manifest!");
        }

        const script = document.createElement("script");
        script.async = true;
        script.src = JSON.parse(response)["promise.js"];
        script.addEventListener("load", run);
        script.addEventListener("error", _throwError);

        document.head.appendChild(script);
    };

    request.open("GET", "/manifest.json");
    request.send();
}
