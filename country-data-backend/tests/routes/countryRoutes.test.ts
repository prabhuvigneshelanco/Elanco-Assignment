import request from "supertest";
import app from "../../src/index";

describe("Country Routes", () => {
  it("should fetch all countries", async () => {
    const res = await request(app).get("/countries");
    expect(res.status).toBe(200);
    expect(res?.body?.data).toBeInstanceOf(Array);
    expect(res?.body?.data?.length).toBeGreaterThan(0);
  });

  it("should search countries by name", async () => {
    const searchQuery = "India";
    const res = await request(app).get(`/countries/search?name=${searchQuery}`);

    expect(res.status).toBe(200);
    expect(res?.body?.data).toBeInstanceOf(Array);
    expect(res.body?.data?.[0].name).toBe("India");
  });

  it("should fetch country by code", async () => {
    const countryCode = "col";
    const res = await request(app).get(`/countries/${countryCode}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Colombia");
  });

  it("should return 404 or 500 for invalid country code", async () => {
    const invalidCode = "XYZ";
    const res = await request(app).get(`/countries/${invalidCode}`);
    const statusCode = res.status === 404 ? 404 : 500;
    expect(res.status).toBe(statusCode);
    expect(res.body).toHaveProperty("error", "Failed to fetch country data");
  });
});
