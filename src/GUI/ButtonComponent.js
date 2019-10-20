/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";

const ButtonComponent = (width, height, text) => (
  <svg width={width} height={height} viewBox={"0 0 "+width+' '+height}>
    <defs>
      <style>
        {
          ".buttonA{fill:#344b72;stroke:#fff;stroke-width:2px;}" +
          ".buttonB{fill:#fff;font-size:25px;font-family:OpenSans, Open Sans;}" +
          ".buttonC{stroke:none;}" +
          ".buttonD{fill:none;}"
        }
      </style>
    </defs>
    <g className="buttonA">
      <rect className="buttonC" width={width} height={height} />
      <rect className="buttonD" x={1} y={1} width={width - 2} height={height - 2} />
    </g>
    <text className="buttonB" x={'50%'} y={'50%'} dominantBaseline={'middle'} textAnchor={'middle'}>
        {text}
    </text>
  </svg>
);

export default ButtonComponent;
