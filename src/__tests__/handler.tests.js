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

  test("should get history", async () => {
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
      path: "/history/2024-08",
      headers: { "x-api-secret": SECRET },
    };

    const result = await handler(event);

    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: true, data }));
    expect(result.statusCode).toBe("200");
    expect(get).toHaveBeenCalled();
  });

  test("should copy registers when month is closed", async () => {
    // arrange
    jest.useFakeTimers().setSystemTime(new Date("2026-01-26T06:00:00.000Z"));

    const data = {
      id: "123",
      records: {
        incomes: [{ id: "1", name: "Bonus", value: 1000 }],
        expenses: [{ id: "2", name: "Rent", value: 500 }],
        investments: [{ id: "3", name: "Stocks", value: 200 }],
      },
      date: "2026-01",
    };
    get.mockResolvedValueOnce(data);

    const event = {
      httpMethod: "PUT",
      path: "/record",
      headers: { "x-api-secret": SECRET },
    };

    // act
    const result = await handler(event);

    // assert
    expect(result).toBeDefined();
    expect(result.statusCode).toBe("200");
    expect(result.body).toBe(JSON.stringify({ ok: true }));

    expect(get).toHaveBeenCalled();
    expect(save).toHaveBeenCalled();
    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        date: "2026-02",
        records: data.records,
      }),
    );

    jest.useRealTimers();
  });

  test("should do not copy registers when month is opened", async () => {
    // arrange
    jest.useFakeTimers().setSystemTime(new Date("2026-01-20T06:00:00.000Z"));

    const event = {
      httpMethod: "PUT",
      path: "/record",
      headers: { "x-api-secret": SECRET },
    };

    // act
    const result = await handler(event);

    // assert
    expect(result).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ ok: false }));

    jest.useRealTimers();
  });
});
