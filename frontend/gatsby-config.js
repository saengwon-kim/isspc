module.exports = {
  siteMetadata: {
    title: '바스티유제빵소',
    description: '바코드만 찍으면 SPC의 손길이 닿은 제품인지 알 수 있는 페이지입니다!',
    url: 'https://isspc.pages.dev',
    image: '/isspc-logo.png'
  },
  plugins: [
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
