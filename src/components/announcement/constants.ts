import type { RoleResourceRoutePaths } from "../../types";

const ANNOUNCEMENT_ROUTE_PATHS: RoleResourceRoutePaths = {
    admin: "/api/v1/actions/announcement",
    employee: "/api/v1/actions/announcement/user",
    manager: "/api/v1/actions/announcement",
};

export { ANNOUNCEMENT_ROUTE_PATHS };
