import type {
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";

const LOGIN_URL = "http://localhost:5500/auth/login";

const LOGIN_BG_IMAGE_URL =
  "https://images.pexels.com/photos/16140813/pexels-photo-16140813/free-photo-of-new-empty-glass-shopping-stalls.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1";

const LOGIN_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "auth/login",
  employee: "auth/login",
  manager: "auth/login",
};

function returnLoginStepperPages(): StepperPage[] {
  const usernameChild: StepperChild = {
    inputType: "text",
    name: "username",
    validationKey: "username",
  };

  const passwordChild: StepperChild = {
    inputType: "text",
    name: "password",
    validationKey: "password",
  };

  return [
    { children: [usernameChild, passwordChild], description: "Login" },
  ];
}

export {
  LOGIN_BG_IMAGE_URL,
  LOGIN_ROUTE_PATHS,
  LOGIN_URL,
  returnLoginStepperPages,
};
