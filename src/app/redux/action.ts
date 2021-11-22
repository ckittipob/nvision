import { getImageDimensions } from "../utils/imageHelper";
import { seed } from "../utils/test";
import * as types from "./type";
import axios from "axios";
//import nvision from "@nipacloud/nvision";


const apiKey = process.env.REACT_APP_API_KEY!

export const detectObject = (image: string) => async (dispatch: any) => {
  try {
    dispatch({ type: types.LOADING });
    const dimensions = await getImageDimensions(image);

    // remove file type in base 64 
    const target = "base64,"
    const trimIndex = image.indexOf(target);
    if(trimIndex === -1) throw {error: 'error'};
    const imageSanitize = image.slice(trimIndex + target.length)
    console.log('img',image.length);
    const response = await axios.post(
      'https://nvision.nipa.cloud/api/v1/object-detection',
      {raw_data: imageSanitize},
      {headers:{
        "Authorization": apiKey
      }})
      dispatch({
        type: types.DETECT_OBJECT,
        payload: {
          results: response.data.detected_objects,
          image: image,
          height: dimensions.height,
          width: dimensions.width,
        },
      });

  } catch (err:any) {
    console.log(err);
  }
};

export const switchMode = (mode: boolean) => async (dispatch: any) => {
  dispatch({ type: types.SWITCH_MODE, payload: mode });
};

export const selectType = (type: string) => async (dispatch: any) => {
  dispatch({ type: types.SELECT_TYPE, payload: type });
};

export const resetResults = () => async (dispatch: any) => {
  dispatch({
    type: types.RESET,
  });
};

export const mouseOnHandler =
  (id: string, parent: string) => async (dispatch: any) => {
    dispatch({
      type: types.MOUSE_ON,
      payload: { id, parent },
    });
  };

export const mouseLeaveHandler =
  (id: string, parent: string) => async (dispatch: any) => {
    dispatch({
      type: types.MOUSE_LEAVE,
      payload: { id, parent },
    });
  };
