const { flatten, unflatten } = require("safe-flat");
const range = require("koa-range");

const middleware = async (config, ctx, next) => {
  await next();

  const bodyFlat = flatten(ctx.response.body);

  const { imgixBaseURL, uploadsURL, imageFormats, imgixDefaultParams } = config;

  for (let key in bodyFlat) {
    if (
      typeof bodyFlat[key] === "string" &&
      bodyFlat[key]?.match(`^${uploadsURL}.+\.(${imageFormats.join("|")})$`)
        ?.length > 0
    ) {
      const pathname = bodyFlat[key]?.split(uploadsURL)?.pop() ?? "";
      const newURL = new URL(pathname, imgixBaseURL);
      const params = new URLSearchParams(imgixDefaultParams);
      newURL.search = params;
      Object.assign(bodyFlat, { [key]: newURL.toString() });
    }
  }

  ctx.response.body = unflatten(bodyFlat);
};

module.exports = ({ strapi }) => {
  const info = (msg) => strapi.log.info(`[imgix-prefixer] ${msg}`);
  const error = (msg) => strapi.log.error(`[imgix-prefixer] ${msg}`);
  info("Initializing REST API...");

  const { restApiRegex, ...config } = strapi.config.get(
    `plugin.imgix-prefixer`
  );

  try {
    new RegExp(restApiRegex);
  } catch {
    error(
      `Error while initializing REST API endpoint='${restApiRegex}'. Reason: 'restApiRegex' parameter is not a valid Regular expression!`
    );
    return;
  }

  if (typeof config.imgixBaseURL !== "string") {
    error(
      `Error while initializing REST API endpoint='${restApiRegex}'. Reason: 'imgixBaseURL' parameter must be a string!`
    );
    return;
  }

  if (typeof config.uploadsURL !== "string") {
    error(
      `Error while initializing REST API endpoint='${restApiRegex}'. Reason: 'uploadsURL' parameter must be a string!`
    );
    return;
  }

  if (!config.imageFormats.every((e) => typeof e === "string")) {
    error(
      `Error while initializing REST API endpoint='${restApiRegex}'. Reason: 'imageFormats' parameter must be an array of strings!`
    );
    return;
  }

  try {
    strapi.server.routes([
      {
        method: "GET",
        path: restApiRegex,
        handler: [range],
        config: {
          auth: false,
          middlewares: [
            (...params) => {
              return middleware(config, ...params);
            },
          ],
        },
      },
    ]);

    info(`Middleware initialized for REST API endpoint='${restApiRegex}'`);
  } catch (e) {
    error(
      `Middleware unable to initialize for REST API endpoint='${restApiRegex}'. Reason: ${e}`
    );
  }
};
