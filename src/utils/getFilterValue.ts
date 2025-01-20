import { User } from "@/types/types";

export const getFilterValue = (
  profile: User,
  filter: string
): string | undefined => {
  switch (filter) {
    case "fullName":
      return profile.fullName;
    case "country":
      return profile.address.country;
    case "city":
      return profile.address.city;
    case "jobTitle":
      return profile.jobTitle;
    default:
      return undefined;
  }
};
