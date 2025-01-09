import { createOrderService } from "../services/orderService";
import { successResponse } from "../utils/response";

export const createOrderController = async (req: any, res: any, next: any) => {
  try {
    const order = await createOrderService(req.body);
    return res.status(200).json(successResponse(true, "Order created successfully", order));
  } catch (error) {
    next(error);
  }
};