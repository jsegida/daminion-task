import { SUCCESS } from "../../constants";

export default ({ products }) => ({
    status: products instanceof Object ? SUCCESS : products
});
