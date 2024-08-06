import productRouter from "./productRoutes.js";
import authRouter from "./authRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import cartRouter from "./cartRoutes.js";
import orderRouter from "./orderRoutes.js";
export default function routes(app) {
  app.get("/", (req, res) => {
    res.send({ message: "server đang chạy" });
  });
  app.use("/products", productRouter);
  app.use("/auth", authRouter);
  app.use("/categories", categoryRouter);
  app.use("/carts", cartRouter);
  app.use("/orders", orderRouter);
}
