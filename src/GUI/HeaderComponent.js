/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";
import colors from "./colors";

const HeaderComponent = () => (
  <svg style={{position: 'fixed', zIndex: '1'}} viewBox="0 0 1920 63">
    <defs>
      <style>
        {
            ".headerA{fill:"+colors.darkBlue+";}" +
            ".headerB,.headerD{fill:"+colors.white+";}" +
            ".headerB{font-size:50px;font-family:Mistral;}" +
            ".headerC{fill:"+colors.lightBlue+";}"
        }
      </style>
    </defs>
    <rect className="headerA" width={1920} height={63} />
    <text className="headerB" transform="translate(130 46)">
      <tspan x={0} y={0}>
        {"AM.BA"}
      </tspan>
    </text>
    <g transform="translate(-597 -382.677)">
      <g transform="translate(633 382.987)">
        <rect
          className="headerC"
          width={55}
          height={55}
          rx={10}
          transform="translate(0 4.689)"
        />
        <path
          className="headerD"
          d="M883.108,621.745l27.684-27.2-.248,20.675,7.4-7.271.313-25.843-25.868-.126-7.4,7.271,20.693.1L878,616.552Z"
          transform="translate(-853.462 -562.055)"
        />
        <path
          className="headerA"
          d="M712.133,382.987,684.466,410.2l.248-20.689-7.4,7.277L677,422.65l25.852.126,7.4-7.277-20.681-.1,27.667-27.214Z"
          transform="translate(-672.597 -382.987)"
        />
      </g>
    </g>
  </svg>
);

export default HeaderComponent;
