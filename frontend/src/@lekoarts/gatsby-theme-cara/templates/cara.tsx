import * as React from "react"
import type { HeadFC } from "gatsby"
import { Parallax, IParallax } from "@react-spring/parallax"
import { useRef, useState, useEffect } from "react"
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
  const parallax = useRef<IParallax>(null!)
  const offsets = [0, 1.2, 4, 6, 7, 8.2, 10.2]
  const factors = [1, 3.5, 2, 1, 1, 2, 1]
  const PAGES = 11.2
  
  return (
    <Layout parallaxRef={parallax} offsets={offsets} factors={factors}>
      <Parallax ref={parallax} pages={PAGES}>
        <MainPage offset={offsets[0]} factor={factors[0]} />
        <BrandList offset={offsets[1]} factor={factors[1]} />
        <Others offset={offsets[2]} factor={factors[2]} />
        <About offset={offsets[3]} factor={factors[3]} />
        <FAQ offset={offsets[4]} factor={factors[4]} />
        <Links offset={offsets[5]} factor={factors[5]} />
        <Contact offset={offsets[6]} factor={factors[6]} />
      </Parallax>
    </Layout>
  )
}

export default Cara

export const Head: HeadFC = () => <Seo />
