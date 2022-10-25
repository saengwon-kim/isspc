import * as React from "react"
import type { HeadFC } from "gatsby"
import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout"
import About from "../isspc/about"
import Contact from "../isspc/contact"
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo"
import MainPage from "../isspc/main-page"
import Links from "../isspc/links"
import BrandList from "../isspc/brand"

const Cara = () => (
  <Layout>
    <Parallax pages={5.5}>
      <MainPage offset={0} factor={1} />
      <BrandList offset={1} factor={1.5} />
      <About offset={2.5} factor={1} />
      <Links offset={3.5} factor={1} />
      <Contact offset={4.5} factor={1} />
    </Parallax>
  </Layout>
)

export default Cara

export const Head: HeadFC = () => <Seo />
