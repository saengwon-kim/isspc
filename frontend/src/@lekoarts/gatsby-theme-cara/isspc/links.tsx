/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import LinksMDX from "../sections/links.mdx"

const Links = ({ offset, factor = 2 }: { offset: number; factor?: number }) => (

  <div>
    <Divider
      bg="divider"
      clipPath="polygon(0 16%, 100% 4%, 100% 82%, 0 94%)"
      speed={ -0.2 }
      offset={offset}
      factor={factor}
    />
    <Content speed={ 0.2 } offset={offset + 0.2} factor={factor}>
      <Inner>
      <div
          className="projectListDiv"
          sx={{
            display: `grid`,
            gridGap: [4, 4, 4, 5],
            gridTemplateColumns: `1fr`,
            h2: { gridColumn: `-1/1` },
          }}
        >
        <LinksMDX />
        </div>
      </Inner>
    </Content>
  </div>
)

export default Links
