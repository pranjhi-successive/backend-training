import router from "./Routes/route.js";
import Express from "express";

const app = Express();
app.use(Express.json());
app.use("/", router);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
