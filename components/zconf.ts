import { z } from "zod";

export const loginSChema = z.object({
    fName: z.string().optional(),
    lName: z.string().optional(),
    password:z.string().min(8),
    email:z.string()
})