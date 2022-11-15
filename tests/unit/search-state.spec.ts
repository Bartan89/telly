import { TestScheduler } from "rxjs/testing";
import { of, Observable, delay, Subscription } from "rxjs";
import { TvShow } from "@/store/types";
import * as utils from "@/services/tv-shows.services";
import { SearchState } from "@/components/series/search/search-state";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toStrictEqual(expected);
});

let getTvShowByQueryMock = jest.spyOn(utils, "getTvShowByQuery");
let sub: Subscription;

describe("searchState", () => {
  it("when user would type fast search query to be send would hold out half a second", () => {
    jest.useFakeTimers();

    let res = "";

    sub = SearchState.searchQuery$.subscribe((val: string) => {
      res = val;
    });

    SearchState.userInputed$.next("te");
    jest.advanceTimersByTime(100);
    SearchState.userInputed$.next("test");

    jest.advanceTimersByTime(100);
    expect(res).toBe("");

    jest.advanceTimersByTime(500);
    expect(res).toBe("test");
  });

  it("expect search query to inmediately return empty", () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(SearchState.searchCameBack$).toBe("a", { a: [] });
    });
  });

  it("When subscription is established regardless in time, return starting value", () => {
    testScheduler.run(({ expectObservable }) => {
      // marble testing virtulizes time through a special syntax that looks like dashes.
      // the ^ represent subscription the r in this context a return on value
      expectObservable(SearchState.searchCameBack$, "---^-!").toBe("---r", {
        r: [],
      });
    });
  });

  it("Should from the moment of subscription give its default value, and even with more triggers return only that which was triggered outside the debounce time", () => {
    jest.useFakeTimers();

    let res = null;

    sub = SearchState.searchCameBack$.subscribe((val) => {
      res = val;
    });

    jest.advanceTimersByTime(200);
    SearchState.userInputed$.next("trigger 1");

    jest.advanceTimersByTime(400);
    SearchState.userInputed$.next("trigger 2");

    jest.advanceTimersByTime(1900);
    SearchState.userInputed$.next("trigger 3");

    getTvShowByQueryMock = jest
      .spyOn(utils, "getTvShowByQuery")
      .mockImplementation(() => of("test") as unknown as Observable<TvShow[]>);

    jest.advanceTimersByTime(0);
    expect(res).toEqual([]);

    jest.advanceTimersByTime(6666);
    expect(getTvShowByQueryMock).toBeCalledTimes(2);
    expect(res).toEqual("test");
  });

  afterEach(() => {
    getTvShowByQueryMock.mockRestore();
    sub.unsubscribe();
  });
});
