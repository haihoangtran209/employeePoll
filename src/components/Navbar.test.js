import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import { setAuthedUser } from "../actions/authedUser";

describe("Navbar", () => {
    beforeEach(() => {
        store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));
    });

    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    // it("should display username of logged in user", () => {
    //     const component = render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Navbar />
    //             </BrowserRouter>
    //         </Provider>
    //     );

    //     const userSpanElement = component.getByTestId("user-information");
    //     expect(userSpanElement.textContent).toBe("User: sarahedo");
    // });
});