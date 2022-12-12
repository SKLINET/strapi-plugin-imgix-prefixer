<h1 align="center">Strapi plugin Imgix Prefixer</h1>

<p align="center">Imgix Prefixer lets you replace URL of your assets returned from REST and GraphQL Apis with an Imgix (or other provider's) proxied URL.</p>

## 👋 Intro

- [👋 Intro](#-intro)
- [✨ Key features](#-key-features)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [⚠️ Requirements](#️-requirements)

## <a id="features"></a>✨ Key features

* **Path replacement:** Replace desired assets' URLs with URL of provider of your choice. E.g. `/uploads/small_Photo_1_d7f33bdc86.png` -> `example.imgix.net/Photo_1_d7f33bdc86.png`.
* **REST Api & GraphQL support:** Imgix prefixer supports URL replacement on both REST (api/content-type) and GraphQL (/graphl) endpoints.
* **Default Imgix parameters:** Define default Imgix parameters you use on every asset easily, and get every asset URL returned with these parameters. E.g. `example.imgix.net/Photo_1_d7f33bdc86.png?auto=format&fit=min`.
* **Highly customizable:** You can choose on which URLs you want the plugin to run. You can customize each route and also the afftected asset extensions.

## <a id="installation"></a>🔧 Installation

Imgix Prefixer is easy to set up. Inside your Strapi app, add the package:

With `npm`:
```bash
npm install @sklinet/strapi-plugin-imgix-prefixer
```
With `yarn`:
```bash
yarn add @sklinet/strapi-plugin-imgix-prefixer
```

In `config/plugins.js` file add:
```js
"imgix-prefixer": {
    enabled: true,
};
```

If you do not yet have this file, then create and add:
```js
module.exports = () => ({
    "imgix-prefixer": {
        enabled: true,
    };
})
```

Then run build:
```bash
npm run build
```

or
```bash
yarn build
```

## <a id="configuration"></a>⚙️ Configuration

You can configure the plugin with config file placed in `/config/plugins.js` with the config prop:

```js
"imgix-prefixer": {
    enabled: true,
    config: {
        imgixBaseURL: "https://beneficio.imgix.net",
        graphql: true,
    },
},
```

| Property           | Type                               | Example                                     | Description                                      | Required | Default                                                   |
|--------------------|------------------------------------|---------------------------------------------|--------------------------------------------------|----------|-----------------------------------------------------------|
| imgixBaseURL       | string                             | "https://example.imgix.net"                 |                                                  | True     | null                                                      |
| uploadsURL         | string                             | /myUploads/                                 |                                                  | False    | /uploads/                                                 |
| restApiRegex       | string (valid regex)               | /api/content-types/(.*)                     |                                                  | False    | /api/(.*)                                                 |
| graphqlApiRegex    | string (valid regex)               | /graphqlEndpoint                            |                                                  | False    | /graphql                                                  |
| imgixDefaultParams | Record<string, string \| string[]> | { auto: ["compress", "format"], fit: "min"} |                                                  | False    | {}                                                        |
| graphql            | boolean                            | true                                        | Register imgix prefixer also on GraphQL endpoint | False    | false                                                     |
| imageFormats       | string[]                           | ["png", "jpg"]                              | Image formats you want to proxy                  |          | [ "png" ,  "jpg" ,  "jpeg" ,  "avif" ,  "gif" ,  "webp" ] |

The default configuration looks like this:

```js
{
        imgixBaseURL: null,
        uploadsURL: "/uploads/",
        restApiRegex: "/api/(.*)",
        graphqlApiRegex: "/graphql",
        imgixDefaultParams: {},
        graphql: false,
        imageFormats: ["png", "jpg", "jpeg", "avif", "gif", "webp"],
}
```

## <a id="requirements"></a>⚠️ Requirements
Strapi **v4.x.x+**

Node **14.19.1 - 18**

Tested on **v4.4.1**
