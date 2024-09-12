import type { RoleResourceRoutePaths } from "../../types";

const LOGIN_URL = "/auth/login";

const LOGIN_BG_IMAGE_URL =
  "https://images.pexels.com/photos/16140813/pexels-photo-16140813/free-photo-of-new-empty-glass-shopping-stalls.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1";

const LOGIN_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "auth/login",
  employee: "auth/login",
  manager: "auth/login",
};

export { LOGIN_BG_IMAGE_URL, LOGIN_ROUTE_PATHS, LOGIN_URL };
