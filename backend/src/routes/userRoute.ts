import express from "express";
import { getMyOrders, login, register, updateOrderStatus } from "../services/userService";
import { ExtendRequest } from "../types/extendedRequest";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

router.get("/my-orders", validateJWT, async (request: ExtendRequest, response) => {
  try {
    const userId = request?.user?._id;
    const { data, statusCode} = await getMyOrders({userId});
    response.status(200).send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

router.put("/order-status", async (request, response) => {
  try {
    const { orderId, status } = request.body;
    const { data, statusCode } = await updateOrderStatus({ orderId, status });
    response.status(statusCode).send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

export default router;
