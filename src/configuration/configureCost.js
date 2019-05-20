import createLetterable from "../components/lettering";
import createCostValueConnector from "../cost/createCostValueConnector";
import createCostValueBuilder from "../components/cost/createCostValueBuilder";
import createHighlightable from "../components/highlight";

export default ({ connectStore }) => {
    const connectCostValue = createCostValueConnector({
        connectStore
    });
    const createCostValue = createCostValueBuilder({
        createHighlightable
    });

    return {
        createLetterable,
        createCostValue: connectCostValue(createCostValue)
    }
}
