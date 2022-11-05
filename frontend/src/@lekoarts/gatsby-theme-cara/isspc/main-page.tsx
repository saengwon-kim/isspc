/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import Svg from "@lekoarts/gatsby-theme-cara/src/components/svg"
import { UpDown, UpDownWide } from "@lekoarts/gatsby-theme-cara/src/styles/animations"
import Mainpage from "../sections/main-page.mdx"
import IsSPC from "../libs/scanner"

const MainPage = ({ offset, factor = 1 }: { offset: number; factor?: number }) => {
  
  return (
    <div id="main">
    <Content sx={{ variant: `texts.bigger` }} speed={0.4} offset={offset} factor={factor}>
      <Inner>
        <Mainpage />
      </Inner>
      <Inner>
        <IsSPC />
      </Inner>
    </Content>
  </div>
)}

export default MainPage
