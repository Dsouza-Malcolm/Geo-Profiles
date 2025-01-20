import { User } from "@/types/types";
import { faker } from "@faker-js/faker";

const generateFakeUser = (): User => {
  const name = faker.person.fullName();
  return {
    id: faker.string.uuid(),
    fullName: name,
    avatar: faker.image.avatar(),
    description: faker.lorem.sentence(),
    email: faker.internet.email({
      firstName: name.split(" ")[0],
      lastName: "",
      provider: "gmail.com",
      allowSpecialCharacters: false,
    }),
    phone: faker.phone
      .number({
        style: "international",
      })
      .slice(0, 10),
    jobTitle: faker.person.jobTitle(),
    company: faker.company.name(),
    interests: faker.lorem
      .words(5)
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode().slice(0, 6),
      country: faker.location.country(),
      coordinates: faker.location.nearbyGPSCoordinate(),
    },
  };
};

// Function to generate fake profiles
const generateFakeProfiles = (count: number): Array<User> => {
  const profiles = [];

  for (let i = 0; i < count; i++) {
    profiles.push(generateFakeUser());
  }

  return profiles;
};

export default generateFakeProfiles;

export const generateImageUrl = () => {
  return faker.image.avatar();
};

export const generateId = () => {
  return faker.string.uuid();
};
