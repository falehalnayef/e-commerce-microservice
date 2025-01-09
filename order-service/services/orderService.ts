import orderModel from "../database/models/orderModel";

export const createOrderService = async (order: any) => {
    const newOrder = await orderModel.create(order);
    return newOrder;
};
