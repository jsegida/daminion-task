import createRepeaterConnector from "../connectors/createRepeaterConnector";
import createErrorBuilder from "../components/error";
import createButton from "../components/button";
import createFormConnector from "../product/connectors/createFormConnector";
import createSubmitter from "../product/actions/createSubmitter";
import order from "../product/repository/order";
import createFormBuilder from "../components/form";
import createLoader from "../components/loader";
import configureForm from "./configureForm";

export default ({ connectStore, getProducts }) => {
    const connectRepeater = createRepeaterConnector({
        connectStore,
        repeat: getProducts
    });
    const createError = createErrorBuilder({
        createButton
    });

    const submit = createSubmitter({
        order
    });
    const connectForm = createFormConnector({
        connectStore,
        submit
    });
    const createForm = createFormBuilder(configureForm({
        connectStore
    }));

    return {
        createError: connectRepeater(createError),
        createForm: connectForm(createForm),
        createLoader
    }
}
