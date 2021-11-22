import React from "react";
import { IObjectDetected } from "../../../app/models/Result";
import { objectIcon } from "../helper/config";
import {v4 as uuid} from 'uuid';
import "./ObjectSelector.scss";
interface IProps {
  selectType(type: string): Promise<void>;
  response: Map<string, IObjectDetected>;
}
const ObjectSelector: React.FC<IProps> = ({ selectType, response }) => {
  return (
    <div className="object-selector-wrapper">
      {Array.from(response.entries()).map((entry) => {
        const [key, value] = entry;
        return (
          <div
            key={uuid()}
            className="object-selector"
            style={{
              color: value.selected ? value.color : "#ccc",
            }}
            onClick={() => {
              selectType(value.parent);
            }}
          >
            <i
              className={objectIcon[value.parent] || objectIcon["default"]}
            ></i>
            <p>{value.parent}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ObjectSelector;
