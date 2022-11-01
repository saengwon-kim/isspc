module.exports = {
  siteMetadata: {
    siteTitle: '깜:빵집',
    siteHeadline: 'SPC, 먹어서 응원하자!',
    siteTitleAlt: `깜:빵집`,
    siteUrl: `https://isspc.pages.dev`,
    siteLanguage: `ko`,
    author: `Saengwon Kim`,
    siteDescription: 'SPC의 손길이 닿은 제품과 가게를 알아볼 수 있도록 도와줍니다.',
    url: 'https://isspc.pages.dev',
    siteImage: '/kkampain.png'
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-cara`,
      options: {
        basePath: `/`
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-stylus',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-4KWSWD43ZZ'],
        pluginConfig: { head: true },
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `깜:빵집`,
        short_name: `isSPC`,
        description: `SPC의 손길이 닿은 제품과 가게를 알아볼 수 있도록 도와줍니다.`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: `/icons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-128x128.png`,
            sizes: `128x128`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `/icons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    }
  ]
}
