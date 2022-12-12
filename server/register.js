"use strict";

const { graphql } = require("./middlewares");

module.exports = ({ strapi }) => {
  if (strapi.config.get(`plugin.imgix-prefixer`)?.graphql) {
    graphql({ strapi });
  }
};
