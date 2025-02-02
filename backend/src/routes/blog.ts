import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@sagarb2003/blog-web";

const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

blogRoute.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    c.status(403);
    return c.json({ msg: "You are not logged in" });
  }
  const token = authHeader.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(403);
    return c.json({ msg: "Token not Found" });
  }
  c.set("userId", payload.id);
  await next();
  return c.json({ msg: "Token verified successfully" });
});

blogRoute.post("/create", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    c.json({
      msg: "Invalid Data",
    });
  }
  try {
    const newBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        thumbnail: body.thumbnail,
        authorName: body.authorName,
        publishedDate: body.publishedDate,
        authorId: userId,
      },
    });
    return c.json({
      id: newBlog.id,
    });
  } catch (e) {
    c.status(403);
    c.json({ msg: "Error in creating the blog" });
  }
});

blogRoute.put("/update", async (c) => {
  //   const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    c.json({
      msg: "Invalid Data",
    });
  }
  try {
    const updatedBlog = await prisma.post.update({
      where: {
        id: body.id,
        // authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        authorName: body.authorName,
        publishedDate: body.publishedDate,
      },
    });
    return c.text("Blog Updated");
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Error while updating Blog" });
  }
});

blogRoute.get("/bulk", async (c) => {
  // const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allBlogs = await prisma.post.findMany({});
  return c.json({ allBlogs });
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const getBlogById = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return c.json({ msg: getBlogById });
  } catch (e) {
    c.status(403);
    return c.text("Blog Not found");
  }
});

blogRoute.get("/user/:id", async (c) => {
  const userId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userBlogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    return c.json({ userBlogs });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Error fetching blogs for the user" });
  }
});

// blogRoute.delete("/", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body=await c.req.json();
//   try {
//     const getBlogById = await prisma.post.delete({
//       where: {
//         id:body.id,
//       },
//     });
//     return c.json({ msg: "Blog deleted" });
//   } catch (e) {
//     c.status(403);
//     return c.text("Blog Not found");
//   }
// });

export default blogRoute;
