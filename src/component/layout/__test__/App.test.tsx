import { Store } from "redux";
import { shallow } from "enzyme";
import { testStore, seed } from "../../../app/utils/test";
import App from "../App";
import { initialState } from "../../../app/redux/reducer";

const dispatch = jest.fn();

const setUp = (store:Store) => {
    store.dispatch = dispatch;
    const wrapper = shallow(
        //@ts-ignore
        <App store={store} />
      );
    return wrapper.dive().dive() 
}

describe("App Component", () => {
    it ('Should render without errors',() => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const component = wrapper.find(".app-container")
        expect(component.length).toBe(1);
    })

    it("Should render uploader by default", () => {
        const store = testStore(initialState);
        const wrapper = setUp(store);
        const component = wrapper.find("Connect(Uploader)")
        expect(component.length).toBe(1);
    })

    it("Should render videosnap if cameraMode is true", () => {
        const state = initialState;
        state.cameraMode = true
        const store = testStore(state);
        const wrapper = setUp(store);
        const component = wrapper.find("Connect(Snapshot)")
        expect(component.length).toBe(1);
    })

    it("Should render loading  while fetching", () => {
        const state = initialState;
        state.loading = true
        const store = testStore(state);
        const wrapper = setUp(store);
        const component = wrapper.find(".loading-container")
        expect(component.length).toBe(1);
    })
})


export {}