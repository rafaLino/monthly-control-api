import { AuthorizationFilter } from './filters/authorization.filters.mjs';
import { get, save } from './functions/index.mjs';

export const handler = (async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    event.httpMethod ??= event.requestContext.http.method;
    try {
        AuthorizationFilter(event);
        switch (event.httpMethod) {
            case 'GET':
                body = await get();
                break;
            case 'POST':
                body = await save(JSON.parse(event.body));
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
});
