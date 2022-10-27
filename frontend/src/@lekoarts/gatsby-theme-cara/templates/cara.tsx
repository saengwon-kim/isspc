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
import "../styles/styles.styl"

const Cara = () => {
  return (
    <Layout>
      <Parallax pages={6}>
        <MainPage offset={0} factor={1} />
        <BrandList offset={1} factor={2} />
        <About offset={3} factor={1} />
        <Links offset={4} factor={1} />
        <Contact offset={5} factor={1} />
      </Parallax>
    </Layout>
  )
}

export default Cara

export const Head: HeadFC = () => <Seo />
