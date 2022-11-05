/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import { UpDown, UpDownWide } from "@lekoarts/gatsby-theme-cara/src/styles/animations"
import FAQMDX from "../sections/faq.mdx"

const FAQ = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
  <div>
      <Divider
        bg="divider"
        clipPath="polygon(0 16%, 100% 4%, 100% 82%, 0 94%)"
        speed={-0.2}
        offset={offset}
        factor={factor}
      />
<Content speed={0.2} offset={offset + 0.1} factor={factor} >
      <Inner>
        <FAQMDX />
      </Inner>
    </Content>
  </div>
)

export default FAQ
