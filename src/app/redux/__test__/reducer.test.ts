import { seed, seedImage } from "../../utils/test";
import reducer from "../reducer";
import {initialState} from '../reducer';
import * as types from "../type";

describe("Reducer", () => {

    it("Should return default state", () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual(initialState);
    })


    it("Should return results when fetch data", () => {
        const newState = reducer(initialState, {
            type: types.DETECT_OBJECT,
            payload: {
                results: seed,
                image: seedImage.image,
                height: seedImage.height,
                width: seedImage.width
            }
        })
        expect(newState.results.size).toBe(5)
    })

    it("Should return cameraMode to true when try selecting camera type", () => {
        const newState = reducer(initialState, {
            type: types.SWITCH_MODE,
            payload: true
        })
        expect(newState.cameraMode).toBeTruthy();
    })

    it("Should clear result when switch mode", () => {
        const newState = reducer(initialState, {
            type: types.SWITCH_MODE,
            payload: true
        })
        expect(newState.results.size).toBe(0);
    })

    it("Should clear results when reset", () => {
        const newState = reducer(initialState, {
            type: types.RESET,
            payload: true
        })
        expect(newState.results.size).toBe(0);
    })
})

export {}