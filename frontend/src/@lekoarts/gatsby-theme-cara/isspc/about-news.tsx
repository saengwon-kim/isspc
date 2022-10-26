/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import AboutMDX from "../sections/about-news.mdx"

const About = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
    <div>
      <Divider
        bg="divider"
        clipPath="polygon(0 16%, 100% 4%, 100% 82%, 0 94%)"
        speed={0.2}
        offset={offset}
        factor={factor}
      />
      <Divider speed={0.1} offset={offset} factor={factor}>
      </Divider>
      <Content speed={0.4} offset={offset} factor={factor}>
        <Inner>
          <AboutMDX />
        </Inner>
      </Content>
    </div>
  )
  
  export default About
  
