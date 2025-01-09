import { createOrderService, deleteOrderService, getOrderByOrderIdService, getOrdersByProductIdService, getOrdersByUserIdService, updateOrderService } from "../services/orderService";
import { successResponse } from "../utils/response";

export const createOrderController = async (req: any, res: any, next: any) => {
  try {
    const order = await createOrderService(req.body);
    return res.status(200).json(successResponse(true, "Order created successfully", order));
  } catch (error) {
    next(error);
  }
};

export const getOrdersByProductIdController = async (req: any, res: any, next: any) => {
    try {
        const orders = await getOrdersByProductIdService(req.params.productId);
        return res.status(200).json(successResponse(true, "Orders fetched successfully", orders));
    } catch (error) {
        next(error);
    }
};

export const getOrdersByUserIdController = async (req: any, res: any, next: any) => {
    try {
        const orders = await getOrdersByUserIdService(req.params.userId);
        return res.status(200).json(successResponse(true, "Orders fetched successfully", orders));
    } catch (error) {
        next(error);
    }
};

export const getOrderByOrderIdController = async (req: any, res: any, next: any) => {
    try {
        const order = await getOrderByOrderIdService(req.params.orderId);
        return res.status(200).json(successResponse(true, "Order fetched successfully", order));
    } catch (error) {
        next(error);
    }
};

export const updateOrderController = async (req: any, res: any, next: any) => {
    try {
        const order = await updateOrderService(req.params.orderId, req.body);
        return res.status(200).json(successResponse(true, "Order updated successfully", order));
    } catch (error) {
        next(error);
    }
};

export const deleteOrderController = async (req: any, res: any, next: any) => {
    try {
        const order = await deleteOrderService(req.params.orderId);
        return res.status(200).json(successResponse(true, "Order deleted successfully", order));
    } catch (error) {
        next(error);
    }
};

