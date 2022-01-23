module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/FilmStrip/" : "/",
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#4fc08d',
            'link-color': '#4fc08d',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};