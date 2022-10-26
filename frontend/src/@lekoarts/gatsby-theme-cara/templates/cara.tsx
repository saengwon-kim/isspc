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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const Cara = () => {
  const { height, width } = useWindowDimensions();
  var list_ratio = [2.5, 1.2];
  // var width_ratio = 300.0 / width; // 1512
  var height_ratio = 867.0 / height;
  var height_factor = 0.0;
  if (width < 800) {
    list_ratio[0] = 2.0;
    list_ratio[1] *= 1.4 ;
    height_factor = 0.05;
  }
  
  return (
    <Layout>
      <Parallax pages={3 + height_factor + (list_ratio[0] + list_ratio[1]) * height_ratio}>
        <MainPage offset={0} factor={1} />
        <BrandList offset={1} factor={height_ratio * list_ratio[0]} />
        <About offset={1 + (height_ratio * list_ratio[0])} factor={1} />
        <Links offset={2 + list_ratio[0] * height_ratio} factor={height_ratio * list_ratio[1] } />
        <Contact offset={2 + height_factor + (list_ratio[0] + list_ratio[1]) * height_ratio} factor={1} />
      </Parallax>
    </Layout>
  )
}

export default Cara

export const Head: HeadFC = () => <Seo />
