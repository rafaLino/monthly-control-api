const SUPER_SECRET = process.env.API_KEY;


export function AuthorizationFilter(event) {
    const { headers } = event;
    if (!headers || !headers['x-api-secret'] || headers['x-api-secret'] !== SUPER_SECRET) {
        throw new Error('Not authorized!');
    }

}