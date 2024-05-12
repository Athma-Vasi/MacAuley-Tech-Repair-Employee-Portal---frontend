import ErrorSuspenseHOC from "../../error/errorSuspenseHOC/ErrorSuspenseHOC";
import AddressChange from "./AddressChange";

function AddressChangeWrapper() {
  return ErrorSuspenseHOC(AddressChange)({});
}

export default AddressChangeWrapper;
