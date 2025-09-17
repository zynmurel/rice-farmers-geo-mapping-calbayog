export const fertilizerTypes = {
  SYNTHETIC: "Synthetic Fertilizer",
  ORGANIC: "Organic Fertilizer",
};

export const fertilizerTypes2 = {
  SOLID: "Solid",
  LIQUID: "Liquid",
};

export const optionsFertilizerTypes3 = [
  {
    parent1: "SYNTHETIC",
    parent2: "SOLID",
    label: "Nitrogen Fertilizer",
    value: "NITROGEN_FERTILIZER",
  },
  {
    parent1: "SYNTHETIC",
    parent2: "SOLID",
    label: "Phosphorus Fertilizer",
    value: "PHOSPHORUS_FERTILIZER",
  },
  {
    parent1: "SYNTHETIC",
    parent2: "SOLID",
    label: "Potassium Fertilizer",
    value: "POTASSIUM_FERTILIZER",
  },
  {
    parent1: "SYNTHETIC",
    parent2: "SOLID",
    label: "Complete (NPK) Fertilizer",
    value: "COMPLETE_FERTILIZER",
  },
  {
    parent1: "SYNTHETIC",
    parent2: "LIQUID",
    label: "Foliar Fertilizer",
    value: "FOLIAR_FERTILIZER",
  },
  {
    parent1: "ORGANIC",
    parent2: "SOLID",
    label: "Animal-Based Fertilizer",
    value: "ANIMAL_BASED_FERTILIZER",
  },
  {
    parent1: "ORGANIC",
    parent2: "SOLID",
    label: "Plant-Based Fertilizer",
    value: "PLANT_BASED_FERTILIZER",
  },
  {
    parent1: "ORGANIC",
    parent2: "LIQUID",
    label: "Extracts",
    value: "EXTRACTS",
  },
  {
    parent1: "ORGANIC",
    parent2: "LIQUID",
    label: "Emulsion",
    value: "EMULSION",
  },
];

export const optionFertilizerType = Object.entries(fertilizerTypes).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  },
);

export const optionFertilizerType2 = Object.entries(fertilizerTypes2).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  },
);
