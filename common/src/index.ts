import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});
export type SignUpType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInType = z.infer<typeof signInInput>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string(),
});

export type CreateBlogType = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type UpdateBlogType = z.infer<typeof updateBlogInput>;
