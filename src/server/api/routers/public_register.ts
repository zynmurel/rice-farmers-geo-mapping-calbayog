import { formatPhoneNumber } from "@/lib/formatPhone";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { isBefore } from "date-fns";
import z from "zod";
import bcrypt from "bcrypt";

export const publicRegisterRouter = createTRPCRouter({
  sendOTP: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const phoneNumber = formatPhoneNumber(input.phoneNumber);

      if (!phoneNumber) {
        throw new Error("Invalid phone number format");
      }

      let farmer = await ctx.db.farmer.findFirst({
        where: {
          phoneNumber: phoneNumber.replace("63", "0"),
        },
      });
      if (!farmer) {
        throw new Error("Phone number not registered in our office");
      }
      if (farmer.accountId) {
        throw new Error("Phone number already registered to a farmer account");
      }

      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

      farmer = await ctx.db.farmer.update({
        where: {
          phoneNumber: phoneNumber.replace("63", "0"),
        },
        data: {
          otp: otp,
          otpCreatedAt: new Date(),
          isVerified: false,
        },
      });

      return {
        otp,
        phoneNumber,
      };
    }),
  submitOtp: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string(),
        otp: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const phoneNumber = formatPhoneNumber(input.phoneNumber);

      if (!phoneNumber) {
        throw new Error("Invalid phone number format");
      }

      let farmer = await ctx.db.farmer.findFirst({
        where: {
          phoneNumber: phoneNumber.replace("63", "0"),
        },
      });
      if (!farmer) {
        throw new Error("Phone number not registered in our office");
      }
      if (farmer.accountId) {
        throw new Error("Phone number already registered to a farmer account");
      }
      if (
        isBefore(farmer.otpCreatedAt!, new Date(Date.now() - 10 * 60 * 1000))
      ) {
        return {
          success: false,
          message: "OTP expired. Please request a new one.",
        };
      }
      if (farmer.otp !== input.otp) {
        return { success: false, message: "Invalid OTP" };
      } else {
        farmer = await ctx.db.farmer.update({
          where: {
            phoneNumber: phoneNumber.replace("63", "0"),
          },
          data: {
            isVerified: true,
          },
        });
        return { success: true, message: "OTP verified", data: farmer };
      }
    }),
  register: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string(), // existing farmer ID
        username: z.string().min(3),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password, confirmPassword } = input;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Check if username already exists
      const existing = await ctx.db.farmerAccount.findUnique({
        where: { username },
      });

      const phoneNumber = formatPhoneNumber(input.phoneNumber);

      if (!phoneNumber) {
        throw new Error("Invalid phone number format");
      }
      if (existing) {
        throw new Error("Username is already taken");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create FarmerAccount
      const account = await ctx.db.farmerAccount.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      // Link to Farmer
      const farmer = await ctx.db.farmer.update({
        where: { phoneNumber: phoneNumber.replace("63", "0") },
        data: { accountId: account.id },
      });

      return {
        message: "Farmer account created successfully",
        account,
        farmer,
      };
    }),
});
