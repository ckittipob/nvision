import { Store } from "redux";
import { shallow } from "enzyme";
import { testStore } from "../../../app/utils/test";
import { initialState } from "../../../app/redux/reducer";
import Navbar from "../Navbar";

const dispatch = jest.fn();

const setUp = (store:Store) => {
    store.dispatch = dispatch;
    const wrapper = shallow(
        //@ts-ignore
        <Navbar store={store} />
      );
    return wrapper.dive().dive() 
}

describe("Navbar Component", () => {
    it ('Should render without errors',() => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const component = wrapper.find(".nav-container")
        expect(component.length).toBe(1);
    })

    it ('Should selected uploader by default', () => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const component = wrapper.find("#main-nav").childAt(0);
        const uploader = component.find(".selected");
        expect(uploader.length).toBe(1);
    })

    it('Should selected camera if camereMode is true', () => {
        const state = initialState;
        state.cameraMode = true
        const store = testStore(state);
        const wrapper = setUp(store);
        const uploader = wrapper.find("#main-nav").childAt(0).find(".selected");
        expect(uploader.length).toBe(0);
        const camera = wrapper.find("#main-nav").childAt(1).find(".selected");
        expect(camera.length).toBe(1);
    })

    it('Should dispatch action when click on uploader', () => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const uploader = wrapper.find("#main-nav").childAt(0);
        uploader.simulate('click');
        expect(dispatch).toHaveBeenCalled();
    })
    it('Should dispatch action when click on camera', () => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const uploader = wrapper.find("#main-nav").childAt(1);
        uploader.simulate('click');
        expect(dispatch).toHaveBeenCalled();
    })

});