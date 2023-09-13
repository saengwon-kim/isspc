/** @jsx jsx */
import { useColorMode, jsx } from "theme-ui"

const ColorButton = () => {
    const [colorMode, setColorMode] = useColorMode()
    const isDark = colorMode === `dark`
    const toggleColorMode = (e: any) => {
        setColorMode(isDark ? `light` : `dark`)
    }

    return (
    <div sx={{ textAlign: `right`, mb: `10px`, position: `absolute`, bottom: 0, right: `10px` }} className="colorButton">
    <button
        sx={{ variant: `buttons.toggle`, fontWeight: `semibold`, position: 'sticky', mt: `10px`, mr:`10px`, borderRadius: `100%`, p: `15px`, opacity: 0.8 }}
        onClick={toggleColorMode}
        type="button"
        aria-label="Toggle dark mode"
        >
        { !isDark ?
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> 
        }
    </button>
    </div>
    )
}

export default ColorButton