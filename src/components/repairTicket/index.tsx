import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import CreateRepairTicket from "./create/CreateRepairTicket";

function RepairTicketWrapper() {
  return ErrorSuspenseHOC(CreateRepairTicket)({});
}

export default RepairTicketWrapper;
