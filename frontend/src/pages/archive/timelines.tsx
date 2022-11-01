/** @jsx jsx */
import { jsx } from "theme-ui"
import React from 'react';
import { Chrono } from 'react-chrono';
import Items from "./items.json"

export const Main = () => {
  return (
    <div className="archive" sx={{textAlign: `center`, width: "90%", height: "95vh"}}>
    <div sx={{ width: "100%", height: "100%",
    textAlign: "center",
    justifyContent: `center`,
    zIndex: 60 }}>
    <div style={{ height: '100%', width: "100%", margin: "auto" }} sx={{
      alignContent: "center",
      "div.rc-title": {
        color: `text`
      },
      "div.active": {
        color: `#666`
      },
      "a": {
        color: `black !important`
      }
    }}>
      <Chrono
        items={Items.items.reverse()}
        mode="VERTICAL"
        disableClickOnCircle={true}
        disableNavOnKey={true}
        hideControls={true}
        cardHeight={100}
        scrollable={{ scrollbar: false }}
      />
    </div>
    </div>
    </div>
  );
};

export default Main;