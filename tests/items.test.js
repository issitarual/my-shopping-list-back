import connection from '../src/database';
import supertest from 'supertest';
import app from '../src/app';

beforeEach(async () => {
    await connection.query(`DELETE FROM items WHERE text = 'teste'`);
  });

afterAll(() => {
  connection.end();
});

describe("POST /items", () => {
    it("returns 200 for valid params", async () => {
        const body = { text: 'teste' };
        const result = await supertest(app).post("/items").send(body)
        expect(result.status).toEqual(200);
    });

    it("returns 404 for invalid params", async () => {
        const body = { text: ' ' };
        const result = await supertest(app).post("/items").send(body);
        expect(result.status).toEqual(404);
    });

    it("returns 404 for invalid params", async () => {
        const body = { text: '123' };
        const result = await supertest(app).post("/items").send(body);
        expect(result.status).toEqual(404);
    });

    it("returns 400 for invalid params", async () => {
        const body = { text: 'vela' };
        const result = await supertest(app).post("/items").send(body);
        expect(result.status).toEqual(400);
    });
});

describe("GET /items", () => {
    it("returns 200 for valid params", async () => {
        const result = await supertest(app).get("/items");
        expect(result.status).toEqual(200);
        expect(typeof result.body === 'object');
    });
})