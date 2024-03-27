import { z } from 'zod'

const envSchema = z.object({
  API_SECRET: z.string().min(1),
  API_HOST: z.string().min(1),
  API_PORT: z.string().min(1),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
})

export const env = envSchema.parse({
  API_SECRET: process.env.API_SECRET,
  API_HOST: process.env.API_HOST,
  API_PORT: process.env.API_PORT,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
})
