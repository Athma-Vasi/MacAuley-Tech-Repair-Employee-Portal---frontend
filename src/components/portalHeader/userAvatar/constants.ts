import type { CheckboxRadioSelectData } from "../../../types";

const FONT_FAMILY_DATA: CheckboxRadioSelectData = [
    { value: "sans-serif", label: "Sans" },
    { value: "serif", label: "Serif" },
    { value: "Open-Dyslexic", label: "Dyslexic" },
];

const LOGOUT_URL = "http://localhost:5500/auth/logout";

export { FONT_FAMILY_DATA };
