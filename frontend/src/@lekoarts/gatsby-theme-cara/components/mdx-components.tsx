import * as React from "react"
import ProjectCard from "@lekoarts/gatsby-theme-cara/src/components/project-card"
import BrandCard from "./brand-card"

const MdxComponents = {
  ProjectCard: ({ link, title, bg, children, ...props }: any) => (
    <ProjectCard {...props} link={link} title={title} bg={bg}>
      {children}
    </ProjectCard>
  ),
  BrandCard: ({ link, title, bg, children, ...props }: any) => (
    <BrandCard {...props} link={link} title={title} bg={bg}>
      {children}
    </BrandCard>
  ),
}

export default MdxComponents
