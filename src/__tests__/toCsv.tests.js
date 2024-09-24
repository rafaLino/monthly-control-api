import { toCsv } from "../utils/index.mjs";

describe("toCsv tests", () => {
  test("should generate a csv file", () => {
    const data = [
      {
        date: "2024-08",
        id: "123",
        records: {
          incomes: [{ id: "1", name: "bonus", value: "100" }],
          expenses: [{ id: "1", name: "credit card", value: "400" }],
          investments: [{ id: "1", name: "stock", value: "222" }],
        },
      },
      {
        date: "2024-09",
        id: "245",
        records: {
          incomes: [],
          expenses: [],
          investments: [],
        },
      },
    ];
    const result = toCsv(data);

    expect(result).not.toBeNull();
    expect(result).toMatchSnapshot();
  });
});
