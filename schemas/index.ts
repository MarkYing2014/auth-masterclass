import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }), 
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});




export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }), 
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),

    name: z.string().min(1, {
        message: "Name is required",
    }), 
    
});