import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store/store";

import Main from "./main";

describe("Test main page", () => {
  it("type work", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const input = screen.getByRole("textbox");

    userEvent.type(input, "Lviv");
    expect(input).toHaveValue("Lviv");
  });
});
