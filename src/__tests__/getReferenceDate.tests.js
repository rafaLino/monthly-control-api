import { getReferenceDate } from "../utils/index.mjs"

describe('getReferenceDate tests', () => {
    afterEach(() => {
        jest.useRealTimers();
    })
    test('should get reference date given a day within the limit', () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-08-20'));

        const date = getReferenceDate(20);

        expect(date).toBe('2024-08')
    })

    test('should get reference date given a day outside the limit', () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-08-26T06:00:00.000Z'));

        const date = getReferenceDate(25);

        expect(date).toBe('2024-09')
    })

    test('should get reference date using the default limit', () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-08-25'));

        const date = getReferenceDate();

        expect(date).toBe('2024-08')
    })
})