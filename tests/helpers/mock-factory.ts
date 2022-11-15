import { TvShow } from "@/store/types";

export const setId = (obj: any) => (id: number) => {
  obj.id = id;
  return createASeries(obj);
};

export const makeNull =
  (obj: any) =>
  <
    A extends keyof TvShow,
    B extends keyof TvShow[A],
    C extends keyof TvShow[A][B]
  >(
    oneLevel: A,
    levelTwo?: B,
    levelThree?: C
  ) => {
    if (levelThree) {
      obj[oneLevel][levelTwo][levelThree] = null;
      return createASeries(obj);
    }

    if (levelTwo) {
      obj[oneLevel][levelTwo] = null;
      return createASeries(obj);
    }

    obj[oneLevel] = null;
    return createASeries(obj);
  };

export const createASeries = (objAltered?: any) => {
  let obj = {
    id: 41000,
    url: "https://www.tvmaze.com/shows/41000/superstar-usa",
    name: "Some Amazing Test Show",
    type: "Reality",
    language: "English",
    genres: ["Comedy", "Action"],
    status: "Ended",
    runtime: 60,
    averageRuntime: 60,
    premiered: "2004-05-17",
    ended: "2004-06-14",
    officialSite: "www.test.com",
    schedule: {
      time: "",
      days: ["Monday"],
    },
    rating: {
      average: 8,
    },
    weight: 23,
    network: {
      id: 71,
      name: "The WB",
      country: {
        name: "United States",
        code: "US",
        timezone: "America/New_York",
      },
      officialSite: "www.test.com",
    },
    webChannel: null,
    dvdCountry: null,
    externals: {
      tvrage: 5,
      thetvdb: 80753,
      imdb: "tt0412254",
    },
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/184/460211.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/184/460211.jpg",
    },
    summary:
      "<p>The WB's<b> Superstar USA</b> is a television show that spoofed the popular show American Idol and which aired on The WB in 2004. Essentially its polar opposite, Superstar USA told contestants they were looking for the best singer when they were actually looking for the worst.</p>",
    updated: 1638204477,
    _links: {
      self: {
        href: "https://api.tvmaze.com/shows/41000",
      },
      previousepisode: {
        href: "https://api.tvmaze.com/episodes/1610270",
      },
    },
  };

  if (objAltered) {
    obj = objAltered;
  }

  return {
    makeNull: makeNull(obj),
    setId: setId(obj),
    value: obj,
  };
};
