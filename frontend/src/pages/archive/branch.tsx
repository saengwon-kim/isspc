/** @jsx jsx */
import { jsx } from "theme-ui"
import Items from "./items.json"
import { Gitgraph, Mode, templateExtend, CommitOptions } from "@gitgraph/react";
import { Commit } from "@gitgraph/core/lib/commit";
import { createElement, useState, useCallback } from "react";
import { BranchLabel }from "@gitgraph/react/src/BranchLabel"

const paddingX = BranchLabel.paddingX;
const paddingY = BranchLabel.paddingY;

const options = {
    template: templateExtend("metro", {
      colors: ["gray", "skyblue", "turquoise", "#0055A4", "#EF4135", "black"],
      commit: {
        message: {
          displayAuthor: false,
          displayHash: false
        }
      }
    })
};

const renderMessage = (commit: Commit) => {
    const messageX = 0;
    var body = null;
    var content = null;
    var _b = useState({
        textWidth: 0,
        textHeight: 0,
    }), textSizing = _b[0], setTextSizing = _b[1];
    var getSizing = useCallback(function (node) {
        if (!node)
            return;
        var box = node.getBBox();
        setTextSizing({ textWidth: box.width, textHeight: box.height });
    }, []);
    var boxWidth = textSizing.textWidth + 2 * paddingX;
    var boxHeight = textSizing.textHeight + 2 * paddingY;
    var rect = createElement("rect", { stroke: commit.style.color, fill: "white", rx: paddingX, width: boxWidth, height: boxHeight });
    if (commit.body) {
        // body = (createElement("foreignObject", { width: "600", x: "paddingX" },
        //     createElement("p", null, commit.body)));
        content = createElement("a", { "href": commit.body, target: "_blank" }, createElement("text", { ref: getSizing, fill: "black", style: { font: commit.style.message.font }, alignmentBaseline: "middle", dominantBaseline: "middle", x: paddingX, y: boxHeight / 2 }, commit.message ));
    } else {
        content = createElement("text", { ref: getSizing, fill: "black", style: { font: commit.style.message.font }, alignmentBaseline: "middle", dominantBaseline: "middle", x: paddingX, y: boxHeight / 2 }, commit.message );
    }

    // Use commit dot radius to align text with the middle of the dot.
    // var y = commit.style.dot.size;
    var y = 0;
    return (createElement("g", { transform: "translate(" + messageX + ", " + y + ")" }, rect, content, body));
}
  
export default function Main() {
    return (
    <div sx={{ width: `100%`, height: `100%` }}>
    <div id="timeline" sx={{ width: `100%`, overflowX: `scroll`, overflowY: `scroll`, height: `100%` }}>
      <Gitgraph options={options}>
        {(gitgraph) => {
          const spc = gitgraph.branch("spc");
          var branch = {
            "spc": spc
          }
          Items.sort((a, b) => {
            return ('' + a["date"]).localeCompare(b["date"]);
          }).map(entry => {
            const type = entry["type"];
            if (!branch[type]) {
                branch[type] = spc.branch(type);
            }
            branch[type].commit({
                subject: entry["title"],
                tag: entry["date"],
                body: entry["link"],
                renderMessage: renderMessage
            });
          });
        }}
      </Gitgraph>
      </div>
      </div>
    );
  }