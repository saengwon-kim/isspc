/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import { UpDown, UpDownWide, waveAnimation } from "../styles/animations"
import Footer from "./footer"
import ContactMDX from "../sections/contact.mdx"

const Contact = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
  <div>
    <Divider
      bg="linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)"
      sx={{ clipPath: `polygon(0 15%, 100% 25%, 100% 85%, 0 75%)` }}
      speed={0.2}
      offset={offset}
      factor={factor}
    />
    <Content speed={0.3} offset={offset} factor={factor} sx={{ zIndex: 100 }} >
      <Inner>
        <ContactMDX />
      </Inner>
    </Content>
    <Content speed={0} offset={offset}>
      <Footer />
    </Content>
  </div>
)

export default Contact
