import { handler } from "../index.mjs";
import { getSignedLink, putCsv } from "../repository/bucket.mjs";
import { get, save, scan } from "../repository/index.mjs";

jest.mock("../repository/index.mjs", () => ({
  save: jest.fn(),
  get: jest.fn(),
  scan: jest.fn(),
}));

jest.mock("../repository/bucket.mjs", () => ({
  putCsv: jest.fn(),
  getSignedLink: jest.fn(),
}));
const SECRET = "myKey";
describe("handler tests", () => {
  test("should get registers", async () => {
    const data = {
      id: "123",
      records: {
        incomes: [],
        expenses: [],
        investments: [],
      },
      date: "2024-08",
    };
    get.mockResolvedValueOnce(data);
    const event = {
      httpMethod: "GET",
      path: "/record",
      headers: { "x-api-secret": SECRET },
    };

    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true, data }));
    expect(result.statusCode).toBe("200");
    expect(get).toHaveBeenCalled();
  });

  test("should save registers", async () => {
    const event = {
      httpMethod: "POST",
      path: "/record",
      headers: { "x-api-secret": SECRET },
      body: JSON.stringify({ incomes: [], expenses: [], investments: [] }),
    };
    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true }));
    expect(result.statusCode).toBe("200");
    expect(save).toHaveBeenCalled();
  });

  test("should extract registers", async () => {
    const data = [
      {
        id: "123",
        records: {
          incomes: [],
          expenses: [],
          investments: [],
        },
        date: "2024-08",
      },
      {
        id: "123",
        records: {
          incomes: [],
          expenses: [],
          investments: [],
        },
        date: "2024-09",
      },
    ];
    scan.mockResolvedValueOnce(data);
    getSignedLink.mockResolvedValueOnce("mylink");

    const event = {
      httpMethod: "POST",
      path: "/extract",
      headers: { "x-api-secret": SECRET },
    };
    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true, data: "mylink" }));
    expect(result.statusCode).toBe("200");
    expect(scan).toHaveBeenCalled();
    expect(putCsv).toHaveBeenCalled();
    expect(getSignedLink).toHaveBeenCalled();
  });

  test("should get extracted data link", async () => {
    getSignedLink.mockResolvedValueOnce("mylink");

    const event = {
      httpMethod: "GET",
      path: "/extract",
      headers: { "x-api-secret": SECRET },
    };
    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true, data: "mylink" }));
    expect(result.statusCode).toBe("200");
    expect(getSignedLink).toHaveBeenCalled();
  });

  test('should get history', async () => {
    const data = {
      id: "123",
      records: {
        incomes: [],
        expenses: [],
        investments: [],
      },
      date: "2024-08",
    };
    get.mockResolvedValueOnce(data);
    const event = {
      httpMethod: "GET",
      path: "/history",
      headers: { "x-api-secret": SECRET },
      pathParameters: { id: '2024-08' }
    };

    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true, data }));
    expect(result.statusCode).toBe("200");
    expect(get).toHaveBeenCalled();
  })
});
