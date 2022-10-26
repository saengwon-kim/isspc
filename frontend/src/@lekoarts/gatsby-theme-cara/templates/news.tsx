import * as React from "react"
import type { HeadFC } from "gatsby"
import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout"
import About from "../isspc/about-news"
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo"
import Contact from "../isspc/contact"

const News = () => (
  <Layout>
    <Parallax pages={2}>
      <About offset={0} factor={1} />
      <Contact offset={1} factor={1} />
    </Parallax>
  </Layout>
)

export default News

export const Head: HeadFC = () => <Seo />
