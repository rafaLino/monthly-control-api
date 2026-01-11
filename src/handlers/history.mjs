import { getByRef } from '../functions/index.mjs';

export default async function (event) {
    let body;
    let statusCode = "200";
    const headers = {
        "Content-Type": "application/json",
    };
    try {
        switch (event.httpMethod) {
            case "GET":
                body = await getByRef(event.pathParameters?.id);
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = "400";
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
}
