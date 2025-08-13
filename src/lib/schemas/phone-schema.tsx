import z from "zod";

export const phoneSchema = z
  .string()
  .regex(/^(\+63\d{10}|09\d{9})$/, "Invalid PH phone number")
  .transform((val) => {
    if (val.startsWith("+63")) {
      return "0" + val.slice(3);
    }
    return val;
  });