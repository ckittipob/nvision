import React, { Fragment } from "react";
import { IObjectDetected } from "../../../app/models/Result";
import Boundary from "./Boundary";
import './OverlayBox.scss';
interface IProps {
  response: Map<string, IObjectDetected>;
  width: number;
  height: number;
  image: string;
}
const OverlayBox: React.FC<IProps> = ({ response, width, height, image }) => {

  return (
    <div className="image-wrapper">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <image href={image} />
        {Array.from(response.entries()).map((entry) => {
            const [key, value] = entry
            return value.detected.map((dt) => {
                return (<Fragment key={dt.id}>
                {value.selected ? (
                  <Boundary
                    x={dt.bounding_box.left}
                    y={dt.bounding_box.top}
                    height={dt.bounding_box.bottom - dt.bounding_box.top}
                    width={dt.bounding_box.right - dt.bounding_box.left}
                    name={dt.name}
                    color={value.color}
                    confidence={dt.confidence}
                    hover={dt.hover}
                  />
                ) : null}
              </Fragment>)
            })
        })}
      </svg>
    </div>
  );
};

export default OverlayBox;
