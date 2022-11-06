/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '../../@lekoarts/gatsby-theme-cara/components/layout';
import Seo from '@lekoarts/gatsby-theme-cara/src/components/seo';
import MDX from './index.mdx';
import Branch from './branch';
import Inner from '@lekoarts/gatsby-theme-cara/src/elements/inner';
import '../../@lekoarts/gatsby-theme-cara/styles/styles.styl';

const Archive = () => {
  return (
    <Layout>
      <div sx={{ display: `block`, width: `100%` }}>
        <div sx={{ display: `block`, height: `100vh` }}>
          <div
            sx={{
              display: `flex`,
              flexDirection: `column`,
              height: `inherit`,
              alignItems: `center`,
              padding: [3, 4, 4, 5],
              justifyContent: `center`,
            }}
          >
            <Inner>
              <MDX sx={{ variant: `texts.bigger` }} />
            </Inner>
            <Inner sx={{ position: `absolute`, bottom: 0, textAlign: `center`, alignContent: `center`}}>
          <svg
            sx={{ mb: `10px` }}
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.5}
          >
            <g transform='scale(2.0)'>
              <path d="M13 13.586V8h-2v5.586l-2.293-2.293-1.414 1.414L12 17.414l4.707-4.707-1.414-1.414L13 13.586z" />
            </g>
          </svg>
        </Inner>
          </div>
        </div>
        <div id="outerBox" sx={{ display: `block`, height: `auto`, padding: `20px` }}>
          <Branch />
        </div>
      </div>
    </Layout>
  );
};

export default Archive;

export const Head: HeadFC = () => <Seo />;
