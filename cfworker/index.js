/** Config */
const getFunctionUrl = (name) =>
  "https://europe-west3-siejmy.cloudfunctions.net/" +
  name +
  "_cbC8qrjxSk7UWmaHhslI";

/** Worker */

addEventListener("fetch", (event) => {
  return event.respondWith(handleRequestOrError(event.request));
});

async function handleRequestOrError(request) {
  try {
    return await handleRequest(request);
  } catch (error) {
    const msg = "Internal";
    return new Response(msg, { status: 500 });
  }
}

async function handleRequest(request) {
  if (request.method !== "GET") {
    return new Response("Invalid method", { status: 404 });
  }

  const parsedUrl = new URL(request.url);
  const pathElems = parsedUrl.pathname.split("/");
  if (pathElems.length < 2) {
    return new Response("Invalid url", { status: 404 });
  }
  const functionName = pathElems[1];
  const params = pathElems.slice(2);
  const response = await queryFunction(functionName, params);
  response.headers.set("Cache-Control", "max-age=" + 3600 * 24 * 3);
  return response;
}

async function queryFunction(name, params) {
  const url = getFunctionUrl(name) + "/" + params.join("/");
  return new Response("Fetching " + url);
  const fetchResponse = await fetch(url);
  if (!fetchResponse.ok) throw new Error("Invalid response");
  return new Response(fetchResponse.body);
}
