import * as React from "react"
import ProjectCard from "@lekoarts/gatsby-theme-cara/src/components/project-card"
import BrandCard from "./brand-card"
import { Link } from "theme-ui"

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
  LinkA: ({ href, children, ...props }: any) => (
    <Link {...props} target="_blank" rel="noreferrer noopener" href={href} sx={{
      color: `text`,
      fontWeight: `semibold`,
      "&:hover": {
        transform: `translateY(-5px)`,
      },
    }}>
    {children}
    </Link>
  ),
}

export default MdxComponents
