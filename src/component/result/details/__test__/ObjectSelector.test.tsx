import { Store } from "redux";
import { shallow } from "enzyme";
import { seed, seedImage, testStore } from "../../../../app/utils/test";
import reducer, { initialState } from "../../../../app/redux/reducer";
import ObjectSelector from "../ObjectSelector";
import * as types  from "../../../../app/redux/type";

const dispatch = jest.fn();
const setUp = () => {
    const newState = reducer(initialState, {
        type: types.DETECT_OBJECT,
        payload: {
            results: seed,
            image: seedImage.image,
            height: seedImage.height,
            width: seedImage.width
        }
    })
    const store = testStore(newState);

    const wrapper = shallow(
        <ObjectSelector
            selectType={dispatch} 
            response={store.getState().results}  />
      );
    return wrapper 
}

describe("Overlay Component", () => {

    it("Should render without error", () => {
        const wrapper = setUp();
        expect(wrapper.find('.object-selector-wrapper').length).toBe(1)
    })

    it("Should render icons by parents", () => {
        const wrapper = setUp();
        expect(wrapper.find('i').length).toBe(5)
    })

    it("Should dispatch action when click on selector", () => {
        const wrapper = setUp();
        const selector = wrapper.find('.object-selector').at(0);
        selector.simulate('click');
        expect(dispatch).toHaveBeenCalled();
    })
})