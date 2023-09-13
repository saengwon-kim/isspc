/** @jsx jsx */
import { jsx } from "theme-ui"
import { Parallax, IParallax } from "@react-spring/parallax"

const ViewMore = (props: {parallaxRef: React.MutableRefObject<IParallax>, offsets: number[]}) => {
    const viewMore = (e: any) => {
        // go to brandListPage
        // 0, 1.2, 4, 6, 7, 8.2, 10.2
        // [1, 3.5, 2, 1, 1, 2, 1]
        if (props.parallaxRef.current.offset < 1.2) {
            return(props.parallaxRef.current.scrollTo(2.0))
        }
        if (props.parallaxRef.current.offset < 4.0) {
            return(props.parallaxRef.current.scrollTo(4.3))
        }
        if (props.parallaxRef.current.offset < 6.0) {
            return(props.parallaxRef.current.scrollTo(6.1))
        }
        if (props.parallaxRef.current.offset < 7.0) {
            return(props.parallaxRef.current.scrollTo(7.1))
        }
        if (props.parallaxRef.current.offset < 8.2) {
            return(props.parallaxRef.current.scrollTo(8.4))
        }
        if (props.parallaxRef.current.offset < 10.2) {
            return(props.parallaxRef.current.scrollTo(10.3))
        }
        return(props.parallaxRef.current.scrollTo(0))
    }

    return (
    <div sx={{ textAlign: `right`, mb: `10px`, position: `absolute`, bottom: 0, right: `70px` }} className="viewMoreButton">
    <button
        sx={{ variant: `buttons.toggle`, fontWeight: `semibold`, position: 'sticky', mt: `10px`, mr:`10px`, borderRadius: `100%`, p: `15px`, opacity: 0.8 }}
        type="button"
        onClick={viewMore}
        aria-label="View more"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="6 6 12 12"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            // opacity={0.5}
          >
        {/* <g transform='scale(1.2)'> */}
        <path d="M13 13.586V8h-2v5.586l-2.293-2.293-1.414 1.414L12 17.414l4.707-4.707-1.414-1.414L13 13.586z" />
        {/* </g> */}
        </svg>
    </button>
    </div>
    )
}

export default ViewMore