import { AuthorizationGuard } from "./guard/authorization.guard.mjs";
import extractHandler from "./handlers/extract.mjs";
import recordsHandler from "./handlers/records.mjs";
import historyHandler from "./handlers/history.mjs";

export const handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  prepareEvent(event);
  try {
    AuthorizationGuard(event);
    switch (event.route) {
      case "record":
        return recordsHandler(event);
      case "extract":
        return extractHandler(event);
      case "history":
        return historyHandler(event);
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

function prepareEvent(event) {
  event.httpMethod ??= event.requestContext.http.method;
  event.path ??= event.requestContext.http.path;
  const segments = event.path.split("/").filter(Boolean);
  event.route = segments.at(0);
  event.params = segments.slice(1);
}
