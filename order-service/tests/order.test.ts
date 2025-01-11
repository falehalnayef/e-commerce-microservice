import app from "../app";
import request from "supertest";

import server from "../server";
describe("Order Routes", () => {
    let orderId = "temp";
    const userId = "677d44b61f982fc196a8a4f5";
    const productId = "677d44b61f982fc196a8a4f7";
    const items = [
        {   
            "product_id": "677d44b61f982fc196a8a4f8",
            "quantity":1,
            "price":100
        },
        {
            "product_id": productId,
            "quantity":1,
            "price":100
        }
    ]

    afterAll(() => {
        server.close();
    });

    it("should return 201", async () => {
        const response = await request(app).post("/orders").send({
            user_id: userId,
            total: 100,
            items: items
        });
        expect(response.status).toBe(201);
        orderId = response.body.data._id;
    });

    it("should return 200 when get orders by product id", async () => {
        const response = await request(app).get(`/orders/product/${productId}`);
        expect(response.status).toBe(200);
    });

    it("should return 200 when get orders by user id", async () => {
        const response = await request(app).get(`/orders/user/${userId}`);
        expect(response.status).toBe(200);
    });

    it("should return 200 when get order by order id", async () => {
        const response = await request(app).get(`/orders/${orderId}`);
        expect(response.status).toBe(200);
    });

    it("should return 200 when update order", async () => {
        const response = await request(app).put(`/orders/${orderId}`).send({
            status: "completed"
        });
        expect(response.status).toBe(200);
    });
    it("should return 200 when get order", async () => {
        const response = await request(app).put(`/orders/${orderId}`).send({
            status: "completed"
        });
        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe("completed");
    });

    it("should return 200 when delete order", async () => {
        const response = await request(app).delete(`/orders/${orderId}`);
        expect(response.status).toBe(200);
    });
});