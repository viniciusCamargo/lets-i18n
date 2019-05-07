import React from "react";
import enzyme from "enzyme";
import M, { cheetos } from "../index";

describe("cheetos", () => {
  it("cheeeeeeetos", () => {
    const actual = cheetos();

    expect(actual).toBe("NOPE");
  });
});

describe("App", () => {
  it("renders the title", () => {
    const app = enzyme.mount(<M />);

    console.log(app.html());
    // expect(true).toBeTruthy();
  });
});
