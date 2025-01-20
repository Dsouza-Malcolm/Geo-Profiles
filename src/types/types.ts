export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  coordinates: [number, number];
};

export interface User {
  id: string;
  fullName: string;
  avatar: string;
  description: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  interests: Array<string>;
  address: Address;
}

export type Filters = {
  fullName: string;
  country: string;
  city: string;
  jobTitle: string;
};

export type StoreState = {
  profiles: User[];
  isAdmin: boolean;
  selectedUser: User | null;
  showLocation: boolean;
  isProfileModalOpen: boolean;
  isSidebarOpen: boolean;
  isDashboardOpen: boolean;
  newAddress: Address | null;
};

export type StoreAction =
  | { type: "SET_PROFILES"; payload: User[] }
  | { type: "SELECT_USER"; payload: { user: User; showLocation: boolean } }
  | { type: "TOGGLE_PROFILE_MODAL" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "AUTHENTICATE" }
  | { type: "TOGGLE_DASHBOARD" }
  | { type: "EDIT_PROFILE"; payload: { user: User } }
  | { type: "UPDATE_PROFILE"; payload: { user: User } }
  | { type: "DELETE_PROFILE"; payload: string }
  | { type: "ADD_PROFILE" }
  | { type: "NEW_PROFILE"; payload: User }
  | { type: "SET_NEW_ADDRESS"; payload: Address };

export type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
};
