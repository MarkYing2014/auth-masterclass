"use server";

import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    
    const validatedFields = RegisterSchema.safeParse(values);
    
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await getUserByEmail(email);

    if (userExists) {
        return { error: "User already exists!" };
    }

    const user = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });


    // todo: send email verification


    // Add your login logic here
    // For example:
    // const user = await authenticateUser(email, password);
    // if (user) {
    //   // Set session, cookies, etc.
    //   return { success: "Logged in successfully!" };
    // } else {
    //   return { error: "Invalid credentials       !" };
    // }

    // Placeholder return
    return { success: "User created successfully!" };
};
