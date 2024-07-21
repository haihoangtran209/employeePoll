import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./New";

describe("NewPoll", () => {
    let component;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );
    });

    it("should render the component", () => {
        expect(component).toBeDefined();
        // expect(component).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondOptionInputElement = component.getByTestId("secondOption");
        const submitButtonElement = component.getByTestId("submit");

        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, { target: { value: 'Texas' } });
        fireEvent.change(secondOptionInputElement, { target: { value: 'New Hampshire' } });

        expect(firstOptionInputElement.value).toBe("Texas");
        expect(secondOptionInputElement.value).toBe("New Hampshire");
    });
});
