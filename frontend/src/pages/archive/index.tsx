/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import type { HeadFC } from "gatsby"
import { Parallax } from "@react-spring/parallax"
import Layout from "../../@lekoarts/gatsby-theme-cara/components/layout"
import Content from "../../@lekoarts/gatsby-theme-cara/elements/content"
// import About from "../@lekoarts/gatsby-theme-cara/isspc/about-news"
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo"
import MDX from "./index.mdx"
import { Main } from "./timelines"
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner"

const Archive = () => (
  <Layout>
    <Parallax pages={2}>
      <Content speed={0.2} offset={0} factor={1}>
        <Inner>
          <MDX sx={{ variant: `texts.bigger` }}/>
        </Inner>
      </Content>
      <Content speed={0.0} offset={1.0} factor={1}>
        <Main/>
      </Content>
    </Parallax>
  </Layout>
)

export default Archive

export const Head: HeadFC = () => <Seo />
