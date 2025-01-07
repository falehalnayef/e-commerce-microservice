import server from "../server";
import request from "supertest";

describe("Product API", () => {

    let products: any[] = [];
 
    afterAll(async () => {
        server.close();
    });

    it("should return 400 if the product is missing required fields", async () => {
        const response = await request(server).post("/products").send({
            price: 100,
            description: "Product 1 description"
        });
        expect(response.status).toBe(400);
    });

    it("should return 200 if the product is added successfully", async () => {
        const response = await request(server).post("/products").send({
            name: "Product 1",
            category: "food",
            price: 100,
            description: "Product 1 description",
            stock: 10,
        });
        expect(response.status).toBe(201);
    });

    it("should return 200 if the product is added successfully", async () => {
        const response = await request(server).post("/products").send({
            name: "Product 2",
            category: "furniture",
            price: 100,
            description: "Product 2 description",
            stock: 10,
        });
        expect(response.status).toBe(201);
    });

    it("should return 200 if the products are fetched successfully", async () => {
        const response = await request(server).get("/products");
        expect(response.status).toBe(200);
        products = response.body.data;
    });

    
    it("should return 200 if the product is fetched successfully", async () => {
        const response = await request(server).get(`/products/${products[0]._id}`);
        expect(response.status).toBe(200);
    });
    

    it("should return 200 if the product is updated successfully", async () => {
        const response = await request(server).put(`/products/${products[0]._id}`).send({
            name: "Product 1 updated",
            price: 100,
            description: "Product 1 updated description"
        });
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("Product 1 updated");
        expect(response.body.data.description).toBe("Product 1 updated description");
    });

    it("should return 200 if the product is deleted successfully", async () => {
        const response = await request(server).delete(`/products/${products[1]._id}`);
        expect(response.status).toBe(200);
    });

    it("should return 200 if the products are fetched successfully", async () => {
        const response = await request(server).get("/products");
        expect(response.status).toBe(200);
    });
});
