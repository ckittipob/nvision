import React from 'react'
import { connect } from 'react-redux';
import Webcam from "react-webcam";
import { detectObject } from "../../app/redux/action";
import "./VideoSnap.scss";

interface IProps {
    detectObject(image: String): Promise<void>;
  }
const Snapshot:React.FC<IProps> = ({ detectObject }) => {
    const webcamRef = React.useRef<any>(null);

    const captureHandler = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc === null ) {
        alert('Camera Initializing')
      } else {
        detectObject(imageSrc);
      }
      
    }
    return (
        <div className="video-wrapper">
            <div>
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg"/>
            </div>
            <div>
                <a className="main-btn"
                onClick={() => captureHandler()}>Capture photo
                </a>
            </div>
            
        </div>
        

      
    )
}

export default connect(null, { detectObject })(Snapshot);