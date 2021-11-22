/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { IObjectDetected } from "../../app/models/Result";
import { IState } from "../../app/redux/reducer";
import "./Result.scss";
import { selectType, resetResults } from "../../app/redux/action";
import OverlayBox from "./overlaybox/OverlayBox";
import ObjectSelector from "./details/ObjectSelector";
import ObjectList from "./details/ObjectList";

interface IProps {
  image: string;
  height: number;
  width: number;
  selectType(type: string): Promise<void>;
  resetResults(): Promise<void>;
  response: Map<string, IObjectDetected>;
}

const Result: React.FC<IProps> = ({
  image,
  height,
  width,
  response,
  selectType,
  resetResults,
}) => {
  return (
    <div className="result-container">
      <div className="result-render">
        <OverlayBox
          response={response}
          width={width}
          height={height}
          image={image}
        />
        <a
          className="main-btn"
          onClick={() => {
            resetResults();
          }}
        >
          Reset
        </a>
      </div>
      <div className="detect-list">
        <h2>Analyzed Results</h2>
        <ObjectSelector selectType={selectType} response={response} />
        <ObjectList response={response} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  image: state.image,
  height: state.height,
  width: state.width,
  response: state.results,
});

export default connect(mapStateToProps, { selectType, resetResults })(Result);
