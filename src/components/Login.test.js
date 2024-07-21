import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";
import '@testing-library/jest-dom/extend-expect';

describe("Login", () => {
    beforeEach(async () => {
        await store.dispatch(handleInitialData());
    });

    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        // expect(component).toMatchSnapshot();
    });

    it('should clear input elements after clicking submit button', async () => {
        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const loginHeadingElement = wrapper.getByTestId("login-id");
        const usernameInputElement = wrapper.getByTestId("test-select");
        const passwordInputElement = wrapper.getByTestId("password");
        const submitButtonElement = wrapper.getByTestId("submit");

        expect(loginHeadingElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, { target: { value: 'sarahedo' } });
        fireEvent.change(passwordInputElement, { target: { value: 'wrongpassword' } });

        expect(usernameInputElement.value).toBe("sarahedo");
        expect(passwordInputElement.value).toBe("wrongpassword");

        fireEvent.click(submitButtonElement);

        // Wait for the state to be updated
        await waitFor(() => {
            expect(loginHeadingElement).toBeInTheDocument();
            // expect(usernameInputElement.value).toBeFalsy();
            expect(passwordInputElement.value).toBe("");
        });
    });
});
