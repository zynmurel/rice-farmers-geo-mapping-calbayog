const currentYear = new Date().getFullYear();

export const years = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => `${1980 + i}`,
);

export const formatName = (data: {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}) => {
  return `${data.firstName}${data.middleName ? ` ${data.middleName}` : " "} ${data.lastName}`;
};
