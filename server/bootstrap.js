"use strict";

const { restApi } = require("./middlewares");

module.exports = ({ strapi }) => {
  restApi({ strapi });
};
