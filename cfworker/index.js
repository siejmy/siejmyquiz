/** Config */
const fnMappings = {
  result:
    "https://europe-west3-siejmy.cloudfunctions.net/ResultCbC8qrjxSk7UWmaHhslI",
};

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
  if (pathElems.length < 3) {
    return new Response("Invalid url", { status: 404 });
  }
  const functionName = pathElems[2];
  const params = pathElems.slice(3);
  const response = await queryFunction(functionName, params);
  response.headers.set("Cache-Control", "max-age=" + 3600 * 24 * 3);
  response.headers.set("Content-type", "text/html; charset=utf-8");
  return response;
}

async function queryFunction(name, params) {
  if (!fnMappings[name]) {
    return make404();
  }
  const url = fnMappings[name] + "/" + params.join("/");
  const fetchResponse = await fetch(url);
  if (!fetchResponse.ok) {
    if (fetchResponse.status === 404) {
      return make404();
    } else {
      throw new Error("Invalid response");
    }
  }
  return new Response(fetchResponse.body);
}

function make404() {
  return new Response("Not found", { status: 404 });
}
