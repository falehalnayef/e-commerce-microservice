import orderModel from "../database/models/orderModel";

export const createOrderService = async (order: any) => {
    const newOrder = await orderModel.create(order);
    return newOrder;
};

export const getOrdersByProductIdService = async (productId: string) => {
    const orders = await orderModel.find({ "items.product_id": productId });
    return orders;
};

export const getOrdersByUserIdService = async (userId: string) => {
    const orders = await orderModel.find({ user_id: userId });
    return orders;
};

export const getOrderByOrderIdService = async (orderId: string) => {
    const order = await orderModel.findById(orderId);
    return order;
};

export const updateOrderService = async (orderId: string, order: any) => {
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, order);
    return updatedOrder;
};