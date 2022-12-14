/** @jsx jsx */
import { jsx } from "theme-ui"

type OthersCardProps = {
  link: string
  title: string
  children: React.ReactNode
  color: string
  bg: string
}

const OthersCard = ({ link, title, children, color, bg }: OthersCardProps) => (
  <div
    sx={{
      width: `100%`,
      boxShadow: `lg`,
      position: `relative`,
      textDecoration: `none`,
      borderRadius: `lg`,
      px: 4,
      py: [4, 5],
      color: color || `background`,
      a: {
        color: color || `background` 
      },
      background: bg || `none`,
      transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
    }}
  >
    <div
      sx={{
        color: `background`,
        textTransform: `uppercase`,
        letterSpacing: `wide`,
        pt: 4,
        fontSize: [4, 5],
        fontWeight: `medium`,
        lineHeight: 1,
      }}
    >
        {title}
    </div>
    <div
      sx={{
        opacity: 0.85,
        color: `background`,
        p: {
          fontSize: 1,
          color: `background`,
          margin: 0,
        },
        a: {
          color: `background`
        }
      }}
    >
      {children}
    </div>
  </div>
)

export default OthersCard
