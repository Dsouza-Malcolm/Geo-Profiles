import { User } from "@/types/types";

export const storeActions = {
  setProfiles: (profiles: Array<User>) => ({
    type: "SET_PROFILES" as const,
    payload: profiles,
  }),

  selectUser: (user: User) => ({
    type: "SELECT_USER" as const,
    payload: user,
  }),

  setAdmin: (isAdmin: boolean) => ({
    type: "SET_ADMIN" as const,
    payload: isAdmin,
  }),
};
