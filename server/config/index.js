"use strict";

module.exports = {
  default: {
    imgixBaseURL: "https://beneficio.imgix.net",
    uploadsURL: "/uploads/",
    restApiRegex: "/api/(.*)",
    graphqlApiRegex: "/graphql",
    imgixDefaultParams: {},
    graphql: false,
    imageFormats: ["png", "jpg", "jpeg", "avif", "gif", "webp"],
  },
  validator() {},
};
