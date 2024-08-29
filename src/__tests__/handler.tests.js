import { handler } from "../index.mjs"
import { get, save } from "../repository/index.mjs";

jest.mock('../repository/index.mjs', () => ({
    save: jest.fn(),
    get: jest.fn()
}));
const SECRET = 'myKey'
describe('handler tests', () => {
    test('should get registers', async () => {
        const data = {
            id: '123', records: {
                incomes: [],
                expenses: [],
                investments: [],
            },
            date: '2024-08'
        }
        get.mockResolvedValueOnce(data)
        const event = { httpMethod: 'GET', headers: { ['x-api-secret']: SECRET } }

        const result = await handler(event);

        expect(result).toBeDefined();
        expect(result.body).toBe(JSON.stringify({ ok: true, data }))
        expect(result.statusCode).toBe("200");
        expect(get).toHaveBeenCalled()
    });

    test('should save registers', async () => {
        const event = { httpMethod: 'POST', headers: { ['x-api-secret']: SECRET }, body: JSON.stringify({ incomes: [], expenses: [], investments: [] }) }
        const result = await handler(event);

        expect(result).toBeDefined();
        expect(result.body).toBe(JSON.stringify({ ok: true }));
        expect(result.statusCode).toBe("200");
        expect(save).toHaveBeenCalled();
    })
})