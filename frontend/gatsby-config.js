module.exports = {
  siteMetadata: {
    siteTitle: '바스티유제빵소',
    siteHeadline: 'SPC, 먹어서 응원하자!',
    siteTitleAlt: `Bastille Bakery`,
    siteUrl: `https://isspc.pages.dev`,
    siteLanguage: `ko`,
    author: `Saengwon Kim`,
    siteDescription: 'SPC의 손길이 닿은 제품인지 알아볼 수 있도록 도와주는 페이지입니다!',
    url: 'https://isspc.pages.dev',
    siteImage: '/logo.png'
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-xxxxxxxxx-x'
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bastille Baker`,
        short_name: `isSPC`,
        description: `SPC의 손길이 닿은 제품인지 알아볼 수 있도록 도와주는 페이지입니다!`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: `/logo.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    }
  ]
}
