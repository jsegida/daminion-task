import createChangerConnector from "../connectors/createChangerConnector";
import chooseProduct from "../product/actions/chooseProduct";
import createProductBuilder from "../components/product";
import createLetterable from "../components/lettering";
import createRadioButtonLabel from "../components/radioButton/createRadioButtonLabel";
import createRadioButton from "../components/radioButton";
import setAmount from "../amount/actions/setAmount";
import createAmountBuilder from "../components/amount";
import createSelect from "../components/select";
import createCostBuilder from "../components/cost";
import createHighlightable from "../components/highlight";
import createChoiceConnector from "../product/connectors/createChoiceConnector";
import createChoiceBuilder from "../components/choice";
import createStatusConnector from "../product/connectors/createStatusConnector";
import createFormFooterBuilder from "../components/form/createFormFooterBuilder";
import createButton from "../components/button";
import configureCost from "./configureCost";

export default ({ connectStore }) => {
    const connectProduct = createChangerConnector({
        connectStore,
        change: chooseProduct
    });
    const createProduct = createProductBuilder({
        createLetterable,
        createRadioButtonLabel,
        createRadioButton
    });

    const connectAmount = createChangerConnector({
        connectStore,
        change: setAmount
    });
    const createAmount = createAmountBuilder({
        createSelect
    });

    const createCost = createCostBuilder(configureCost({
        connectStore
    }));

    const connectChoice = createChoiceConnector({
        connectStore
    });
    const createChoice = createChoiceBuilder({
        createHighlightable
    });

    const connectStatus = createStatusConnector({
        connectStore
    });
    const createFormFooter = createFormFooterBuilder({
        createButton
    });

    return {
        createProduct: connectProduct(createProduct),
        createAmount: connectAmount(createAmount),
        createCost,
        createChoice: connectChoice(createChoice),
        createFormFooter: connectStatus(createFormFooter)
    }
}
