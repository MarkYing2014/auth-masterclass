"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";




export const login = async (
  values: z.infer<typeof LoginSchema>,
  
) => {
    console.log("Login function called with values:", values);

    // Step 1: Validate fields
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        console.log("Validation failed:", validatedFields.error);
        return { error: "Invalid fields!" };
    }

    // Return the validated data
    return { 
        success: true, 
        data: validatedFields.data 
    };

  
};
