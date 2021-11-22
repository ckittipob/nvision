/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { detectObject } from "../../app/redux/action";
import "./Uploader.scss";

interface IProps {
  detectObject(image: String): Promise<void>;
}

const Uploader: React.FC<IProps> = ({ detectObject }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ["image/png", "image/jpg", "image/jpeg"],
    maxSize: 3000000,
    maxFiles: 1,
    onDrop: (files, err) => {
      if (err.length > 0) {
        errorHandler(err);
      } else {
        const reader = new FileReader();
        let base64image = "";
        reader.onload = (event: any) => {
          base64image = event.target.result;
          detectObject(base64image);
        };
        reader.readAsDataURL(files[0]);
      }
    },
  });

  const errorHandler = (error: any) => {
    console.log(error);
    if (error.length > 0) {
      alert(error[0].errors[0].message);
    }
  };

  return (
    <div className="dropzone-wrapper">
      <div
        className={
          isDragActive
            ? "dropzone-container dropzone-container-active"
            : "dropzone-container"
        }
      >
        <div className={"dropzone-box"} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={"dropzone-text"}>
            <h2>
              <i className="fas fa-image fa-4x"></i>
            </h2>
            <h2>Drop image here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { detectObject })(Uploader);
