import { registerEnumType } from "type-graphql";


export enum IUserPersonality {
  "INTJ" = "INTJ",
  "INTP" = "INTP",
  "ENTJ" = "ENTJ",
  "ENTP" = "ENTP",
  "INFJ" = "INFJ",
  "INFP" = "INFP",
  "ENFJ" = "ENFJ",
  "ENFP" = "ENFP",
  "ISTJ" = "ISTJ",
  "ESTJ" = "ESTJ",
  "ISTP" = "ISTP",
  "ISFP" = "ISFP",
  "ESTP" = "ESTP",
  "ESFP" = "ESFP"
}

export enum IUserMaritalStatus {
  "soltero" = "Soltero",
  "casado" = "Casado",
  "viudo" = "Viudo",
  "divorsiado" = "Divorsiado",
  "complicado" = "Es complicado",
}

export enum IUserLookingFor {
  "pareja" = "Pareja",
  "amigos" = "Amigos",
  "casual" = "Algo casual",
}

export enum IUserPets {
  "cat" = "Gato",
  "dog" = "Perro",
  "reptile" = "Reptile",
  "amphibian" = "Anfibio",
  "fish" = "Pescado",
  "nopets" = "Sin mascotas",
  "allpets" = "Todas las mascotas"
}

export enum IUserSexualOrientation {
  "heterosexual" = "Heterosexual",  
  "gay" = "Gay",
  "lesbiana" = "Lesbiana",
  "bisexual" = "Bisexual",
  "asexual" = "Asexual",
  "demisexual" = "Demisexual",
  "pansexual" = "Pansexual",
  "queer" = "Queer",
  "questioning" = "Questioning"
}

export enum IUserStatus {
  "active" = "active",
  "banned" = "banned",
  "pending" = "pending",
}

export enum IUserDegree {
  "Primaria" = "Primaria",
  "secundaria" = "Secundaria",
  "Bachillerato" = "Bachillerato",
  "Carrera" = "Carrera",
}

export enum IUserReligion {
  "cristiano" = "Cristiano",
  "catolico" = "Catolico",
  "ateo" = "Ateo",
}

export enum IUserNacionality {
  "mexicano" = "Mexicano",
  "gringo" = "Gringo",
  "canadiense" = "Canadiense",
}

export enum IUserInterests {
  "run"        = "correr",
  "food"       = "comida",
  "videogames" = "video juegos",
  "gym"        = "Gimnasio",
  "series"     = "Series",
  "music"      = "musica",
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

registerEnumType(IUserNacionality, {
  name: "Nacionality",
  description: "User Nacionality.",
});

registerEnumType(IUserInterests, {
  name: "Interests",
  description: "User Interests.",
});