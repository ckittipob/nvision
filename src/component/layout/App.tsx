import React, { Fragment } from "react";
import Navbar from "./Navbar";
import "./App.scss";
import Uploader from "../uploader/Uploader";
import { IState } from "../../app/redux/reducer";
import { connect } from "react-redux";
import Result from "../result/Result";
import VideoSnap from "../videosnap/VideoSnap";

interface IProps {
  state: IState;
}

const App: React.FC<IProps> = ({ state: { results, loading, cameraMode } }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="app-container">
        {results.size === 0 ? (
          <Fragment>
            {!loading ? (
              <div className="controller-container">
                {!cameraMode ? (<Uploader />) : (<VideoSnap />)}
              </div>
            ) : (
              <div className="loading-container">
                <i className="fas fa-circle-notch fa-spin fa-10x"></i>
              </div>
            )}
          </Fragment>
        ) : (
          <Result />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  state: state,
});

export default connect(mapStateToProps, {})(App);
