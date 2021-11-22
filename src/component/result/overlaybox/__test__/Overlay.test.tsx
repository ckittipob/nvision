import { Store } from "redux";
import { shallow } from "enzyme";
import { seed, seedImage, testStore } from "../../../../app/utils/test";
import reducer, { initialState } from "../../../../app/redux/reducer";
import OverlayBox from "../OverlayBox";
import * as types  from "../../../../app/redux/type";


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
        <OverlayBox 
            response={store.getState().results} 
            width={seedImage.width} 
            height={seedImage.height} 
            image={store.getState().image}  />
      );
    return wrapper 
}

describe("Overlay Component", () => {
    it("Should render without error", () => {
        const wrapper = setUp();
        expect(wrapper.find('.image-wrapper').length).toBe(1)
    })

    it('Should render svg box by image property', () => {
        const wrapper = setUp();
        const component = wrapper.find(`[viewBox="0 0 ${seedImage.width} ${seedImage.height}"]`)
        expect(component.length).toBe(1);
    })

    it("Should render all boundary components", () => {
        const wrapper = setUp();
        expect(wrapper.find('Boundary').length).toBe(38)
    })
})

