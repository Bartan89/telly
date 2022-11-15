import { TvShow } from "@/store/types";
import {
  catchError,
  defer,
  delay,
  EMPTY,
  expand,
  map,
  of,
  reduce,
  repeat,
  tap,
} from "rxjs";
import { ajax } from "rxjs/ajax";

const API = "https://api.tvmaze.com/";

export const getPageOfTvShows = (next: number) => {
  return ajax<TvShow[]>({
    url: `${API}shows?page=${next}`,
    crossDomain: true,
    withCredentials: false,
  });
};

export const partialGetHighRatedShows = (prime: number) => {
  let iterator = prime;
  return (which: number, prevResponse: any) => {
    return ajax<TvShow[]>({
      url: `${API}shows?page=${which}`,
      crossDomain: true,
      withCredentials: false,
    }).pipe(
      delay(300),
      map(({ response }) => ({
        response: [...prevResponse, response]
          .flat(2)
          .filter((show) => show.rating.average > 8)
          .filter((show) => show.image.original),
        count: iterator,
      })),
      tap(() => (prime < 130 ? iterator++ : iterator--)),
      catchError(() => of({ count: undefined, response: undefined }))
    );
  };
};

export const getTvShowByQuery = (query: string) => {
  return ajax<{ score: number; show: TvShow }[]>({
    url: `${API}search/shows?q=${query.toLowerCase()}`,
    crossDomain: true,
    withCredentials: false,
  }).pipe(
    delay(1000),
    map((r) => r.response),
    map((el) => el.filter(({ show }) => show.image?.original)),
    map((r) => r.map((el) => el.show))
  );
};

export const getTvShowById = (id: string) => {
  return ajax<TvShow>({
    url: `${API}shows/${id}`,
    crossDomain: true,
    withCredentials: false,
  }).pipe(
    delay(1000),
    map((r) => r.response)
  );
};

export const recursivelyGrabRandomTvShowsAndRelaseInBulk = () => {
  // this number (260) was extracted by traversing the API found here:
  // type-generation/genres-types.ts
  const randomStart = Math.floor(Math.random() * 260);
  let sequence: null | number = null;
  return defer(() => {
    if (!sequence) {
      sequence = randomStart;
    }

    sequence > 255 ? sequence-- : sequence++;

    return getPageOfTvShows(sequence);
  }).pipe(
    repeat(5),
    map(({ response }) => response),
    map((shows) => shows.filter((show) => show?.image?.original)),
    reduce((prev: TvShow[], cur: TvShow[]) => [...prev, ...cur], [])
  );
};

export const recursiveAskOnHighRatedShows = (randomStart: number) => {
  const primedFunction = partialGetHighRatedShows(randomStart);
  return of({ count: randomStart, response: [] }).pipe(
    expand(({ count, response }) =>
      response.filter((series: any) => series?.rating?.average > 8).length < 40
        ? primedFunction(count, response)
        : EMPTY
    ),
    map(({ response }) => response as TvShow[])
  );
};
