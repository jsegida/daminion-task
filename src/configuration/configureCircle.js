import createCircleInnerSpace from "../components/circle/createCircleInnerSpace";
import createCircleMetadataConnector from "../circle/connectors/createCircleMetadataConnector";

export default ({ connectStore }) => {
    const connectCircleMetadata = createCircleMetadataConnector({
        connectStore
    });

    return {
        createCircleInnerSpace: connectCircleMetadata(createCircleInnerSpace)
    }
}
