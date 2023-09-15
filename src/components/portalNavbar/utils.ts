import { PortalNavbarState } from './types';

type ToggleNavlinksActiveInput = {
  navlinksState: PortalNavbarState;
  toggledNavlink: string;
  payload: boolean;
};

/**
 * @description Toggles the currently clicked navlink to active and all other navlinks to inactive
 * @param param0  - Destructured object
 * @param navlinksState - The current state of the navlinks
 * @param toggledNavlink - The navlink that was clicked
 * @param payload - The payload to set the navlink to
 * @returns  - An object with all navlinks set to inactive except the toggled navlink
 */
function toggleNavlinksActive({
  navlinksState,
  toggledNavlink,
  payload,
}: ToggleNavlinksActiveInput): PortalNavbarState {
  return Object.keys(navlinksState).reduce(
    (acc: PortalNavbarState, navlink) => {
      if (navlink === toggledNavlink) {
        return { ...acc, [navlink]: payload };
      }
      return { ...acc, [navlink]: false };
    },

    Object.create(null)
  );
}

export { toggleNavlinksActive };
