/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"
import Content from "../elements/content"
import BrandListMDX from "../sections/brandlist.mdx"

const BrandList = ({ offset, factor = 2 }: { offset: number; factor?: number }) => (
    <div>
      <Divider
        bg="linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)"
        sx={{ clipPath: `polygon(0 15%, 100% 25%, 100% 85%, 0 75%)` }}
        speed={0.1}
        offset={offset}
        factor={factor}
      />
      <Content speed={0.2} offset={offset + 0.1} factor={factor}>
        <Inner>
          <div
            id="brandList"
            className="brandListDiv"
            sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(6, 1fr)`,
              gap: 4,
              h2: { gridColumn: `-1/1` },
              "div#searchBrandBox": { gridColumn: `-1/1`},
            }}
          >
            <div id="searchBrandBox" sx={{ display: "none" }}> 
              {/* To Be Implement */}
              <label htmlFor="searchBrand" >브랜드 검색 <input id="searchBrand" type="text" placeholder="ALL" sx={{ fontSize: `1rem` }} />
              </label>
            </div>
            <BrandListMDX />
          </div>
        </Inner>
      </Content>
    </div>
)

export default BrandList
