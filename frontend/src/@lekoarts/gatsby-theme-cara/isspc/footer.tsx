/** @jsx jsx */
import { Box, Flex, Link, useColorMode, jsx } from "theme-ui"

const Footer = () => {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`

  return (
    <Box as="footer" variant="footer" sx={{bottom: `5px`, zIndex: `999`}}>
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
      Copyright &copy; {new Date().getFullYear()}<div sx={{ mx: 1 }}>by</div>{` `}<Link href="https://github.com/saengwon-kim">Saengwon Kim</Link>
      </Flex>
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
      <img width="36" height="36" src="/icons/icon-512x512.png" alt="Logo" /><div sx={{ ml: 1 }}>Logo</div><div sx={{ mx: 1 }}>by</div>{` `}<Link href="https://prfl.link/@0jun_heart0">Jun Heart</Link>
      </Flex>
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
        {isDark ? (
          <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_v2-light_w30.png" alt="LekoArts Logo" />
        ) : (
          <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_v2_w30.png" alt="LekoArts Logo" />
        )}
        {` `}
        <Link
          aria-label="Link to the theme's GitHub repository"
          sx={{ ml: 2 }}
          href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-cara"
        >
          Theme
        </Link>
        <div sx={{ mx: 1 }}>by</div>
        {` `}
        <Link
          aria-label="Link to the theme author's website"
          href="https://www.lekoarts.de?utm_source=cara&utm_medium=Theme"
        >
          LekoArts
        </Link>
      </Flex>
    </Box>
  )
}

export default Footer
