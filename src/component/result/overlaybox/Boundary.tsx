import React from 'react'

interface IProps {
    x: number;
    y: number;
    height: number;
    width: number;
    name: string;
    color: string;
    confidence: number;
    hover: boolean;

}
const Boundary:React.FC<IProps>= ({x,y,height, width,name,color,confidence,hover}) => {
    return (
        <g>
        <rect
          className="boundary"
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={color}
          strokeWidth={!hover ? 2 : 7}
          opacity={!hover ? 0.7 : 1}
          fill="transparent"
        />

        <text
          x={x}
          y={y - 20}
          fill={color}
          fontSize={!hover ? "0.5rem" : "3rem"}
        >{`${name} : ${confidence}%`}</text>
        </g>
    )
}

export default Boundary
