import { Store } from "redux";
import { shallow } from "enzyme";
import { seed, seedImage, testStore } from "../../../../app/utils/test";
import reducer, { initialState } from "../../../../app/redux/reducer";
import Boundary from "../Boundary";

import * as types  from "../../../../app/redux/type";


const setUp = () => {


    const wrapper = shallow(
        <Boundary 
            x={0} 
            y={0} 
            height={0} 
            width={0} 
            name={"test-name"} 
            color={"#fff"} 
            confidence={10} 
            hover={false} />
      );
    return wrapper 
}

describe("Overlay Component", () => {
    it("Should render without error", () => {
        const wrapper = setUp();
        expect(wrapper.find('g').length).toBe(1)
    })

    it("Should render name", () => {
        const wrapper = setUp();
        expect(wrapper.text().includes("test-name")).toBeTruthy();
    })

    it("Should render confidence level", () => {
        const wrapper = setUp();
        expect(wrapper.text().includes("10%")).toBeTruthy();
    })
})