const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const { User } = require("../../models/user");

const app = require("../../app");
const { it, describe, expect, beforeAll, afterAll } = require("@jest/globals");

mongoose.set("strictQuery", false);

const { DB_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    mongoose.connect(DB_HOST);
  });
  afterAll(() => {
    mongoose.disconnect(DB_HOST);
  });

  it("status code should be 200", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(result.statusCode).toBe(200);
  });

  it("token should exist", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(result.body.data.token).not.toBe(undefined);
  });

  it("token should be a string", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(typeof result.body.data.token).toBe("string");
  });

  it("token must be valid", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    const user = await User.findOne({ email: "testuser@mail.com" });
    expect(result.body.data.token).toBe(user.token);
  });

  it("user should exist", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(result.body.data).not.toBe(undefined);
  });

  it("user should be an object", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(typeof result.body.data).toBe("object");
  });

  it("email should exist", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(result.body.data.email).not.toBe(undefined);
  });

  it("email should be a string", async () => {
    const result = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    expect(typeof result.body.data.email).toBe("string");
  });

  it("subscription should exist", async () => {
    const result = await request(app).patch("/api/users/").send({
      subscription: "pro",
    });
    expect(result.request._data.subscription).not.toBe(undefined);
  });

  it("subscription should be a string", async () => {
    const result = await request(app).patch("/api/users/").send({
      subscription: "pro",
    });
    expect(typeof result.request._data.subscription).toBe("string");
  });
});
