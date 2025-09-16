export const fertilizerTypes = {
  SYNTHETIC: "Synthetic Fertilizer",
  ORGANIC: "Organic Fertilizer",
};

export const optionFertilizerType = Object.entries(fertilizerTypes).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  },
);
