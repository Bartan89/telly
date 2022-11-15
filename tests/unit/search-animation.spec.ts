import { shallowMount } from "@vue/test-utils";
import SearchAnimation from "../../src/components/series/search/searchResults/SearchAnimation.vue";

describe("search animation", () => {
  it("when user types the ball should be bouncing", async () => {
    const componentUnderTest = shallowMount(SearchAnimation as any, {
      data: () => ({
        stateOfInput: "started typing",
      }),
    });

    expect(componentUnderTest.html()).toContain("bouncingBall");
  });

  it("when user is done typing the ball should be static", () => {
    const componentUnderTest = shallowMount(SearchAnimation as any, {
      data: () => ({
        stateOfInput: "request send",
      }),
    });

    expect(componentUnderTest.html()).toContain("staticBall");
  });

  it("when user is done typing the ball should be static", () => {
    const componentUnderTest = shallowMount(SearchAnimation as any, {
      data: () => ({
        stateOfInput: "something came back",
      }),
    });

    expect(componentUnderTest.html()).toContain("greenBall");
  });
});
