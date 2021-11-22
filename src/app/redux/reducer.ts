import { pallete } from "../../component/result/helper/config";
import { IObjectDetected, IResult } from "../models/Result";
import {v4 as uuid} from 'uuid';
import * as types from "./type";

export interface IState {
    image: string;
    height: number;
    width: number;
    results : Map<string, IObjectDetected>,
    loading: boolean,
    cameraMode: boolean
}

export const initialState: IState = {
    image: "",
    height: 0,
    width: 0,
    results: new Map(),
    loading: false,
    cameraMode: false
};

const reducer = (state = initialState, action:any) => {
    const {type, payload} = action;
    switch (type) {
        case types.DETECT_OBJECT: {
            const listMap: Map<string, IObjectDetected> = new Map();
            let counter = -1;
            (payload.results as IResult[]).forEach((detected) => {
                if (listMap.get(detected.parent) === undefined) {
                    counter++;
                    if (counter >= pallete.length - 1) {
                        counter = 0;
                    }
                    listMap.set(detected.parent, {
                        parent: detected.parent,
                        selected: true,
                        color: pallete[counter],
                        detected: [{
                            id: uuid(),
                            confidence: parseInt((detected.confidence*100).toFixed(0)),
                            parent: detected.parent,
                            name: detected.name,
                            bounding_box: detected.bounding_box,
                            hover: false
                        }]
                    })
                    
                    
                } else {
                    const newDetected = listMap.get(detected.parent)!.detected
                    newDetected.push({
                        id: uuid(),
                        confidence: parseInt((detected.confidence*100).toFixed(0)),
                        parent: detected.parent,
                        name: detected.name,
                        bounding_box: detected.bounding_box,
                        hover: false
                    })

                    listMap.set(detected.parent, {
                        parent: detected.parent,
                        selected: true,
                        color: pallete[counter],
                        detected: newDetected        
                    })
                }
            })
            return { ...state,
                image:  payload.image,
                results: listMap,
                loading: false,
                height: payload.height,
                width: payload.width
            }
        }
        case types.MOUSE_ON: {
            const newResults:Map<string, IObjectDetected> = new Map(state.results);
            const holder = newResults.get(payload.parent)!;
            for (var i = 0; i < holder.detected.length; i++) {
                if (holder.detected[i].id === payload.id) {
                    holder.detected[i].hover = true;
                    break;
                }
            } 
            newResults.set(payload.parent, holder);
            return {...state, results: newResults}
        }

        case types.MOUSE_LEAVE: {
            const newResults:Map<string, IObjectDetected> = new Map(state.results);
            const holder = newResults.get(payload.parent)!;
            for (var j = 0; j < holder.detected.length; j++) {
                if (holder.detected[j].id === payload.id) {
                    holder.detected[j].hover = false;
                    break;
                }
            } 
            newResults.set(payload.parent, holder);
            return {...state, results: newResults}
        }
        case types.SELECT_TYPE: {
            const newResults:Map<string, IObjectDetected> = new Map(state.results);
            const holder = newResults.get(payload)!;
            holder.selected = !holder.selected;
            newResults.set(payload, holder)
            return {
                ...state, 
                results: newResults  
            }
        }
        case types.LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case types.RESET: {
            return {
                ...state,
                results: new Map(),
                image: "",
                height: 0,
                width: 0
            }
        }
        case types.SWITCH_MODE: {
            return {
                ...state,
                cameraMode: payload,
                results: new Map(),
                image: "",
                height: 0,
                width: 0
            }
        }
        default: 
            return state
    }
}


export default reducer;