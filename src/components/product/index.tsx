import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import CreateProduct from "./CreateProduct";

function ProductWrapper() {
    return ErrorSuspenseHOC(CreateProduct)({});
}

export default ProductWrapper;
