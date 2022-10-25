module.exports = {
  siteMetadata: {
    siteTitle: '바스티유제빵소',
    siteHeadline: 'SPC, 먹어서 응원하자!',
    siteTitleAlt: `Bastille Bakery`,
    siteUrl: `https://isspc.pages.dev`,
    siteLanguage: `ko`,
    author: `Saengwon Kim`,
    siteDescription: '바코드만 찍으면 SPC의 손길이 닿은 제품인지 알 수 있는 페이지입니다!',
    url: 'https://isspc.pages.dev',
    siteImage: '/icons.png'
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
    'gatsby-plugin-offline'
  ]
}
