import { Store } from "redux";
import { shallow } from "enzyme";
import { seed, seedImage, testStore } from "../../app/utils/test";
import reducer, { initialState } from "../../app/redux/reducer";
import Result from "./Result";
import * as types  from "../../app/redux/type";


const setUp = (store:Store) => {
    const wrapper = shallow(
        //@ts-ignore
        <Result store={store} />
      );
    return wrapper.dive().dive() 
}


describe("Result Component", () => {
    it("Should render without error", () => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const component = wrapper.find(".result-container")
        expect(component.length).toBe(1);
    })
})