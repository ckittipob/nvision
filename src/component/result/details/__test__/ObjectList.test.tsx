import { Store } from "redux";
import { shallow } from "enzyme";
import { seed, seedImage, testStore } from "../../../../app/utils/test";
import reducer, { initialState } from "../../../../app/redux/reducer";
import ObjectList from "../ObjectList";
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
    store.dispatch = dispatch;
    const wrapper = shallow(
        //@ts-ignore
        <ObjectList store={store} response={store.getState().results} />
      );
    return wrapper.dive()
}

describe("Overlay Component", () => {
    it("Should render without error", () => {
        const wrapper = setUp();
        expect(wrapper.find('.object-list-wrapper').length).toBe(1)
    })

    it("Should render all object lists", () => {
        const wrapper = setUp();
        expect(wrapper.find('.object-item').length).toBe(38);
    })

    it("Should render dispatch action when mouse on object", () => {
        const wrapper = setUp();
        const item = wrapper.find('.object-item').at(0);
        item.simulate('mouseenter');
        expect(dispatch).toHaveBeenCalled();
    })

    it("Should render dispatch action when mouseleave object", () => {
        const wrapper = setUp();
        const item = wrapper.find('.object-item').at(0);
        item.simulate('mouseleave');
        expect(dispatch).toHaveBeenCalled();
    })

})