import { z } from 'zod'

const envSchema = z.object({
  API_SECRET: z.string(),
})

export const env = envSchema.parse({
  API_SECRET: process.env.API_SECRET,
})
