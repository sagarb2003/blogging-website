import { Hono } from "hono";

// const app = new Hono();

//base path
const api = new Hono().basePath("/api/v1");

api.get("/signup", (c) => c.text("Hello user"));

api.post("/signin", (c) => c.text("Hello user"));

api.post("/blog", (c) => c.text("Hello user"));

api.put("/blog", (c) => c.text("Hello user"));
api.get("/blog/:id", (c) => {
  const id = c.req.param("id");
  return c.text("Hello blog "+ id);
});

export default api;
