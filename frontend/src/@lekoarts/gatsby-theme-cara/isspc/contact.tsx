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
      bg="divider"
      clipPath="polygon(0 16%, 100% 4%, 100% 82%, 0 94%)"
      speed={factor / 5}
      offset={offset}
      factor={factor}
    />
    <Content speed={-factor / 5} offset={offset - factor * 0.4} factor={factor} sx={{ zIndex: 100 }} >
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
