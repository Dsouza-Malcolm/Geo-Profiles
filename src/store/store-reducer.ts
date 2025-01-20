import { StoreAction, StoreState } from "@/types/types";

export const initialState: StoreState = {
  profiles: [],
  isAdmin: false,
  selectedUser: null,
  showLocation: false,
  isProfileModalOpen: false,
  isSidebarOpen: true,
  isDashboardOpen: false,
  newAddress: null,
};

export const storeReducer = (
  state: StoreState,
  action: StoreAction
): StoreState => {
  switch (action.type) {
    case "SET_PROFILES":
      return {
        ...state,
        profiles: action.payload,
      };
    case "SELECT_USER":
      return {
        ...state,
        selectedUser: action.payload.user,
        showLocation: action.payload.showLocation,
      };
    case "TOGGLE_PROFILE_MODAL":
      return {
        ...state,
        isProfileModalOpen: !state.isProfileModalOpen,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "AUTHENTICATE":
      return {
        ...state,
        isAdmin: !state.isAdmin,
        isDashboardOpen: false,
      };
    case "TOGGLE_DASHBOARD":
      return {
        ...state,
        isDashboardOpen: !state.isDashboardOpen,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        selectedUser: action.payload.user,
        isProfileModalOpen: !state.isProfileModalOpen,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile.id === action.payload.user.id
            ? { ...profile, ...action.payload.user }
            : profile
        ),
        isProfileModalOpen: !state.isProfileModalOpen,
        selectedUser: action.payload.user,
        newAddress: null,
      };
    case "DELETE_PROFILE":
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id !== action.payload
        ),
        selectedUser: null,
        isProfileModalOpen: !state.isProfileModalOpen,
      };
    case "ADD_PROFILE":
      return {
        ...state,
        isProfileModalOpen: !state.isProfileModalOpen,
        selectedUser: null,
      };

    case "NEW_PROFILE":
      return {
        ...state,
        profiles: [action.payload, ...state.profiles],
        isProfileModalOpen: !state.isProfileModalOpen,
        newAddress: null,
      };

    case "SET_NEW_ADDRESS":
      return {
        ...state,
        newAddress: { ...action.payload },
      };

    default:
      return { ...state };
  }
};
