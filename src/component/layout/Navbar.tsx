/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { IState } from "../../app/redux/reducer";
import "./Navbar.scss";
import { switchMode } from "../../app/redux/action";

interface IProps {
  cameraMode: boolean;
  switchMode(mode: boolean): Promise<void>;
}

const Navbar: React.FC<IProps> = ({ cameraMode, switchMode }) => {
  return (
    <header id="header-home">
      <div className="nav-container">
        <nav id="main-nav">
          <div
            onClick={() => switchMode(false)}
            className={`nav-item ${cameraMode ? "" : "selected"}`}
          >
            <i className="fas fa-image fa-1x"></i>
          </div>
          <div
            onClick={() => switchMode(true)}
            className={`nav-item ${!cameraMode ? "" : "selected"}`}
          >
            <i className="fas fa-camera fa-1x"></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = (state: IState) => ({
  cameraMode: state.cameraMode,
});

export default connect(mapStateToProps, { switchMode })(Navbar);
