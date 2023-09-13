/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import Divider from '@lekoarts/gatsby-theme-cara/src/elements/divider';
import Inner from '@lekoarts/gatsby-theme-cara/src/elements/inner';
import Content from '../elements/content';
import Svg from '@lekoarts/gatsby-theme-cara/src/components/svg';
import {
  UpDown,
  UpDownWide,
} from '@lekoarts/gatsby-theme-cara/src/styles/animations';
import Mainpage from '../sections/main-page.mdx';
import IsSPC from '../libs/scanner';

const MainPage = ({
  offset,
  factor = 1,
}: {
  offset: number;
  factor?: number;
}) => {
  return (
    <div id="main">
      <Content
        sx={{ variant: `texts.bigger` }}
        speed={0.4}
        offset={offset}
        factor={factor}
      >
        <Inner>
          <Mainpage />
        </Inner>
        <Inner>
          <IsSPC />
        </Inner>
        {/* <Inner sx={{ position: `absolute`, bottom: 0, textAlign: `center`, alignContent: `center`}}>
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
        </Inner> */}
      </Content>
    </div>
  );
};

export default MainPage;
