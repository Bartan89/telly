import { catchError, delay, EMPTY, expand, map, of, scan, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { TvShow } from "../src/store/types";

export const getAllGenres = ((prime: number) => {
  let request = prime;
  return (which: number) => {
    return ajax<TvShow[]>({
      url: `https://api.tvmaze.com/shows?page=${which}`,
      crossDomain: true,
      withCredentials: false,
    }).pipe(
      delay(300),
      map(({ response }) => ({ response, count: request })),
      tap(() => request++),
      catchError(() => of({ count: undefined, response: undefined }))
    );
  };
})(1);

export const api_meta_data$ = of({ count: 0, response: undefined }).pipe(
  expand(({ count }) => (count !== undefined ? getAllGenres(count) : EMPTY)),
  scan<any, any>(
    (acc, next) => {
      if (!next.response) {
        return {
          genres: acc.genres,
          pages: acc.count,
          seriesChecked: acc.seriesChecked,
        };
      }
      const pushIn = next.response.map((el: any) => el.genres);
      return {
        genres: [...acc.genres, ...pushIn],
        pages: next.count,
        seriesChecked: acc.seriesChecked + next.response.length,
      };
    },
    { genres: [], pages: 0, seriesChecked: 0 }
  ),
  map((el: { genres: string[]; pages: number }) => ({
    ...el,
    genres: [...new Set(el.genres.flat(2))],
  })),
  tap((el) => console.log(JSON.stringify(el, null, 2)))
);
