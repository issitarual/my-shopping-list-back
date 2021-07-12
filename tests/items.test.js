import connection from '../src/database';
import supertest from 'supertest';

beforeEach(async () => {
    await connection.query(`DELETE FROM items WHERE name = 'teste`);
  });

afterAll(() => {
  connection.end();
});

describe("POST /items", async () => {
    it("returns 200 for valid params", () => {
        const body = {
          text: 'teste'
        };
        
        const result = await supertest(app).post("/items").send(body);
        const status = result.status;
        
        expect(status).toEqual(200);
    });
});