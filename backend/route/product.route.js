import { Router } from "express";
import {getProduct,createProduct,deleteProduct,updateProduct} from "../controller/product.controller.js"
const route =Router();

route.get("/getProduct",getProduct)
route.post("/createProduct",createProduct)
route.put("/updateProduct/:id",updateProduct)
route.delete("/deleteProduct/:id",deleteProduct)


export default route;