export const seasons = {
  DRY_SEASON: "Dry Season",
  WET_SEASON: "Wet Season",
};

export const establishment = {
  TRANSPLANTED: "Transplanted",
  DIRECT_WET_SEEDED: "Direct Wet Seeded",
  DIRECT_DRY_SEEDED: "Direct Dry Seeded",
};

export const environments = {
  IRRIGATED_LOWLAND: "Irrigated Lowland",
  RAINFED_LOWLAND: "Rainfed Lowland",
  COOL_ELEVATED: "Cool Elevated",
  UPLAND: "Upland",
  SALINE: "Saline",
};

export const seed_classifications = {
  INBRED: "Inbred",
  HYBRID: "Hybrid",
  SPECIAL_RICE: "Special Rice",
  GLUTINOUS: "Glutinous",
};

export const optionSeasons = Object.entries(seasons).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

export const optionEstablishment = Object.entries(establishment).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  },
);

export const optionEnvironments = Object.entries(environments).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  },
);

export const optionSeedClassifications = Object.entries(
  seed_classifications,
).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});
