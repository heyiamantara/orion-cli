import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization, bearer } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "https://orion-cli.onrender.com",
  basePath: "/api/auth",
  trustedOrigins: ["https://orion-cli.vercel.app"],
  plugins: [
    bearer(),
    deviceAuthorization({
      expiresIn: "30m",
      interval: "5s",
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: ["user:email"],
    },
  
  },

    logger: {
        level: "debug"
    }
});
