export const ROUTES = [
  {
    url: "/free",
    auth: false,
    creditCheck: false,
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/free`]: "",
      },
    },
  },
  {
    url: "/premium",
    auth: false,
    creditCheck: false,
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: "",
      },
    },
  },
];
