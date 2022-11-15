import { shallowMount } from "@vue/test-utils";
import { createASeries } from "../helpers/mock-factory";
import ShowDetails from "../../src/components/showDetails/ShowDetails.vue";

describe("show detail", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => null);
  });

  it("should render", async () => {
    const componentUnderTest = shallowMount(ShowDetails as any, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
    });
    expect(componentUnderTest.exists()).toBe(true);
  });

  it("should, if call did not come back yet show loader", async () => {
    const componentUnderTest = shallowMount(ShowDetails as any, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
      data: () => ({
        show: undefined,
      }),
    });

    expect(componentUnderTest.html()).toContain("loading");
  });

  it("should show rating if not null", async () => {
    const componentUnderTest = shallowMount(ShowDetails as any, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
      data: () => ({
        show: createASeries().setId(2).value,
      }),
      directives: {
        lazy: {},
      },
    });

    expect(componentUnderTest.html()).toContain("<span>8</span>");
  });

  it("should not show rating if rating is not part of object (some shows in API come without rating)", async () => {
    const componentUnderTest = shallowMount(ShowDetails as any, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
      data: () => ({
        show: createASeries().makeNull("rating").value,
      }),
      directives: {
        lazy: {},
      },
    });

    expect(componentUnderTest.html()).toContain("<span></span>");
  });
});
