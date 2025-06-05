import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
      mustChangePassword: boolean;
    };
  }

  interface User {
    id: string;
    username: string;
    role: string;
    mustChangePassword: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    mustChangePassword: boolean;
  }
}