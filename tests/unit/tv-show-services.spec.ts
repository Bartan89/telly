import { Subscription } from "rxjs";
import { recursivelyGrabRandomTvShowsAndRelaseInBulk } from "../../src/services/tv-shows.services";
import * as m from "../../src/services/tv-shows.services";
import { createASeries } from "../helpers/mock-factory";

const httpMock = (...callbacks: any[]) => {
  return { response: callbacks.map((cb) => cb.value) } as never;
};

let sub: Subscription;
let mock: any;
const GETPAGEOFTVSHOWSMOCKED = "getPageOfTvShows";

describe("getAllTvShows", () => {
  it("should not allow some shows to enter state if object did not include imagery (it can be asumed a show is little spectacular if no image is there)", (done) => {
    mock = jest
      .spyOn(m, GETPAGEOFTVSHOWSMOCKED)
      .mockResolvedValueOnce(
        httpMock(createASeries().setId(1).makeNull("image", "original"))
      )
      .mockResolvedValueOnce(httpMock(createASeries().setId(2)))
      .mockResolvedValueOnce(httpMock(createASeries().setId(3)))
      .mockResolvedValueOnce(httpMock(createASeries().setId(4)))
      .mockResolvedValueOnce(
        httpMock(createASeries().setId(5).makeNull("image", "original"))
      );

    sub = recursivelyGrabRandomTvShowsAndRelaseInBulk().subscribe((series) => {
      expect(series.length).toBe(3);
      done();
    });
  });

  it("should not allow shows to enter state if no image there", (done) => {
    mock = jest
      .spyOn(m, GETPAGEOFTVSHOWSMOCKED)
      .mockResolvedValue(
        httpMock(createASeries().makeNull("image", "original"))
      );

    sub = recursivelyGrabRandomTvShowsAndRelaseInBulk().subscribe((series) => {
      expect(series.length).toBe(0);
      done();
    });
  });

  it("should, if in one call, return some with and some without picture to reflect state", (done) => {
    mock = jest
      .spyOn(m, GETPAGEOFTVSHOWSMOCKED)
      .mockResolvedValueOnce(
        httpMock(createASeries().makeNull("image", "original"), createASeries())
      )
      .mockResolvedValue(httpMock(createASeries()));

    sub = recursivelyGrabRandomTvShowsAndRelaseInBulk().subscribe((series) => {
      expect(series.length).toBe(5);
      done();
    });
  });

  afterEach(() => {
    sub.unsubscribe();
    mock.mockRestore();
  });
});
