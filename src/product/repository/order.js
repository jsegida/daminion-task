import wait from "../../utilities/wait";

const MAX_TIMEOUT = 3000;
const FAKE_ERROR_PROBABILITY = 0.33;

export default async order => {
    await wait(Math.random() * MAX_TIMEOUT);

    if (Math.random() <= FAKE_ERROR_PROBABILITY) {
        throw new Error("Oops!");
    }

    return order;
};
