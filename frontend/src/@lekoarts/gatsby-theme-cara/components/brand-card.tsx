/** @jsx jsx */
import './brandcard.styl'
import { jsx } from "theme-ui"

type BrandCardProps = {
  link: string
  title: string
  children: React.ReactNode
  bg: string
}

const BrandCard = ({ link, title, children, bg }: BrandCardProps) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer noopener"
    sx={{
      width: `100%`,
      aspectRatio: 1,
      boxShadow: `lg`,
      position: `relative`,
      textDecoration: `none`,
      borderRadius: `lg`,
      px: 1,
      py: 1,
      color: `white`,
      background: `white`,
      transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
      img: {
        // position: `absolute`,
      },
      "&:hover": {
        color: `white !important`,
        transform: `translateY(-5px)`,
        boxShadow: `xl`,
      },
    }}
  >
    <p className="BrandChildren"
      sx={{
        opacity: 0.85,
        textShadow: `0 2px 10px rgba(0, 0, 0, 0.3)`,
        p: {
          fontSize: 1,
          color: `black`,
          margin: 0,
        },
      }}
    >
      {children}
    </p>
    <p className="BrandTitle"
      sx={{
        textAlign: `center`,
        fontSize: `normal`,
        width: `100%`,
        fontWeight: `medium`,
        color: `black !important`,
      }}
    >
      {title}
    </p>
  </a>
)

export default BrandCard
