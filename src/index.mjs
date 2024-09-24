import { AuthorizationFilter } from "./filters/authorization.filters.mjs";
import extractHandler from "./handlers/extract.mjs";
import recordsHandler from "./handlers/records.mjs";

export const handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  event.httpMethod ??= event.requestContext.http.method;
  event.path ??= event.requestContext.http.path;
  try {
    AuthorizationFilter(event);
    switch (event.path) {
      case "/record":
        return recordsHandler(event);
      case "/extract":
        return extractHandler(event);
      default:
        throw new Error(`Unsupported path "${event.path}"`);
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
