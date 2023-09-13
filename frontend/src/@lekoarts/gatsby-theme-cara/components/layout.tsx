import * as React from 'react';
import { get } from 'theme-ui';
import { MDXProvider } from '@mdx-js/react';
import { Global } from '@emotion/react';
import MdxComponents from './mdx-components';
import ColorButton from './color-button';
import ViewMore from './view-more';
import { Parallax, IParallax } from '@react-spring/parallax';

type LayoutProps = {
  children: React.ReactNode;
  parallaxRef: React.MutableRefObject<IParallax>;
  offsets?: number[];
  factors?: number[];
  className?: string;
};

const Layout = ({ children, parallaxRef, offsets, factors, className = `` }: LayoutProps) => {
  return (
    <React.Fragment>
      <Global
        styles={(t) => ({
          '*': {
            boxSizing: `inherit`,
            '&:before': {
              boxSizing: `inherit`,
            },
            '&:after': {
              boxSizing: `inherit`,
            },
          },
          html: {
            fontSize: `18px`,
            WebkitTextSizeAdjust: `100%`,
          },
          img: {
            borderStyle: `none`,
          },
          pre: {
            fontFamily: `monospace`,
            fontSize: `1em`,
          },
          '[hidden]': {
            display: `none`,
          },
          '::selection': {
            backgroundColor: get(t, `colors.primary`),
            color: get(t, `colors.background`),
          },
        })}
      />
      <MDXProvider components={MdxComponents}>
        <main className={className}>
          {children}
          <ColorButton />
          <ViewMore parallaxRef={parallaxRef} offsets={offsets} />
        </main>
      </MDXProvider>
    </React.Fragment>
  );
};

export default Layout;
