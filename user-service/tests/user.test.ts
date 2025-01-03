import server from "../server";
import request from "supertest";
import db from "../database/db";
import redisClient from "../redis/redisClient";
import { getOTP } from "../redis/redisClient";
describe("User API", () => {

    beforeAll(async () => {
        await db.query("DELETE FROM users");
        await redisClient.flushAll();
    });

    afterAll(async () => {
        await db.query("DELETE FROM users");
        await redisClient.flushAll();
        await redisClient.quit();
        await db.end();
    });

    const email = "john.doe@example.com";
   const password = "Abcd@1234";

   const userQuery = "SELECT * FROM users WHERE email = $1";

    it("should return 400 if the user is missing required fields", async () => {
        const response = await request(server).post("/users").send({
            email,
            password
        });

        expect(response.status).toBe(400);
    
        const user = await db.query(userQuery, [email]);

        expect(user.rows.length).toBe(0);
    });

    it("should fail to login with invalid credentials", async () => {
        const response = await request(server).post("/users/login").send({
            email,
            password
        });
        expect(response.status).toBe(404);
    });
    it("should create a user", async () => {
        const response = await request(server).post("/users").send({
            name: "John Doe",
            email,
            password
        });

        expect(response.status).toBe(201);

        const user = await db.query(userQuery, [email]);

        expect(user.rows.length).toBe(1);
    });
    it("should fail to login with incorrect password", async () => {
        const response = await request(server).post("/users/login").send({
            email,
            password:"fdsafdsa"
        });
        expect(response.status).toBe(401);
    });

    it("should fail to login with unverified user", async () => {
        const response = await request(server).post("/users/login").send({
            email,
            password,
        });
        expect(response.status).toBe(401);
    });

    it("should send otp to user email", async () => {
        const response = await request(server).post("/users/send-otp").send({
            email
        });
        expect(response.status).toBe(200);
    });

    it("should verify user otp", async () => {

        const otp = await getOTP(email)
        expect(otp).not.toBeNull();
        const response = await request(server).post("/users/verify").send({
            email,
            otp
        });
        expect(response.status).toBe(200);
    });

    it("should login with verified user", async () => {
        const response = await request(server).post("/users/login").send({
            email,
            password
        });
        expect(response.status).toBe(200);
    });
    
})
