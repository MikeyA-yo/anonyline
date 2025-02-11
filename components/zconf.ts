import { z } from "zod";

export const loginSChema = z.object({
   name:z.string().optional(),
    password:z.string().min(8),
    email:z.string()
})