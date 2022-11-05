import * as React from "react"
import type { HeadFC } from "gatsby"
import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout"
import About from "../isspc/about"
import FAQ from "../isspc/faq"
import Contact from "../isspc/contact"
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo"
import MainPage from "../isspc/main-page"
import Links from "../isspc/links"
import BrandList from "../isspc/brand"
import Others from "../isspc/others"
import "../styles/styles.styl"

const Cara = () => {
  return (
    <Layout>
      <Parallax pages={11.2}>
        <MainPage offset={0} factor={1} />
        <BrandList offset={1.2} factor={3.5} />
        <Others offset={4} factor={2} />
        <About offset={6} factor={1} />
        <FAQ offset={7} factor={1} />
        <Links offset={8.2} factor={2} />
        <Contact offset={10.2} factor={1} />
      </Parallax>
    </Layout>
  )
}

export default Cara

export const Head: HeadFC = () => <Seo />
