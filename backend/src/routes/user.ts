import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signUpInput,signInInput } from "@sagarb2003/blog-web";

//base path
const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(403);
    c.json({
      msg: "Incorrect Input",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (existingUser) {
      c.status(403);
      return c.json({ msg: "User Already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "User Registered Successful " + token });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "error while signing up" });
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success}=signInInput.safeParse(body);
  if(!success){
    c.status(403);
    c.json({msg:"Invalid Credentials"})
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ msg: "Invalid Credentials" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "User Signed Successfully " + token });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Error while Signing In" });
  }
});

export default userRoute;
