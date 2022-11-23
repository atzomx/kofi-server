import { registerEnumType } from "type-graphql";

export enum IUserPersonality {
  "intj" = "intj",
  "intp" = "intp",
  "entj" = "entj",
  "entp" = "entp",
  "infj" = "infj",
  "infp" = "infp",
  "enfj" = "enfj",
  "enfp" = "enfp",
  "istj" = "istj",
  "estj" = "estj",
  "istp" = "istp",
  "isfp" = "isfp",
  "estp" = "estp",
  "esfp" = "esfp",
}

export enum IUserMaritalStatus {
  "single" = "single",
  "married" = "married",
  "widower" = "widower",
  "divorced" = "divorced",
  "complicated" = "complicated",
}

export enum IUserLookingFor {
  "couple" = "couple",
  "friends" = "friends",
  "casual" = "casual",
}

export enum IUserPets {
  "cat" = "cat",
  "dog" = "dog",
  "reptile" = "reptile",
  "amphibian" = "amphibian",
  "fish" = "fish",
  "nopets" = "nopets",
  "allpets" = "allpets",
}

export enum IUserSexualOrientation {
  "heterosexual" = "heterosexual",
  "gay" = "gay",
  "lesbian" = "lesbian",
  "bisexual" = "bisexual",
  "asexual" = "asexual",
  "demisexual" = "demisexual",
  "pansexual" = "pansexual",
  "queer" = "queer",
  "questioning" = "questioning",
}

export enum IUserStatus {
  "active" = "active",
  "banned" = "banned",
  "pending" = "pending",
}

export enum IUserDegree {
  "elementary_school" = "elementary_school",
  "middle_school" = "middle_school",
  "high_school" = "high_school",
  "bachelors" = "bachelors",
}

export enum IUserReligion {
  "christianity" = "christianity",
  "catholicism" = "catholicism",
  "atheist" = "atheist",
}

export enum IUserInterests {
  "run" = "run",
  "food" = "food",
  "videogames" = "videogames",
  "gym" = "gym",
  "series" = "series",
  "music" = "music",
}

registerEnumType(IUserPersonality, {
  name: "Personality",
  description: "User Personality.",
});

registerEnumType(IUserMaritalStatus, {
  name: "MaritalStatus",
  description: "User Marital Status.",
});

registerEnumType(IUserLookingFor, {
  name: "LookingFor",
  description: "User Looking For.",
});

registerEnumType(IUserPets, {
  name: "Pets",
  description: "User Pets.",
});

registerEnumType(IUserSexualOrientation, {
  name: "SexualOrientation",
  description: "User Sexual Orientation.",
});

registerEnumType(IUserStatus, {
  name: "Status",
  description: "User status.",
});

registerEnumType(IUserDegree, {
  name: "Degree",
  description: "User Degree.",
});

registerEnumType(IUserReligion, {
  name: "Religion",
  description: "User Religion.",
});

registerEnumType(IUserInterests, {
  name: "Interests",
  description: "User Interests.",
});
