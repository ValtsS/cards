import { render } from "@testing-library/react";
import App from "App";
import React from "react";



describe("App component", () => {

    it("should render without crash", () => {
        render(<App />);
    });
});
