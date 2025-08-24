import app from "./app.js";
import dbConfig from "./config/db.config.js";
import route from "./route/product.route.js";
import path from "path";
import {static as static_ } from "express";
import "dotenv/config";


const __dirname = path.resolve();


const PORT = process.env.PORT || "5000";

app.use("/api", route);

if(process.env.NODE_ENV==="production"){
  app.use(static_(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
  });

}

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
  dbConfig();
});
