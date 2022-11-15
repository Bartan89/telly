import { SearchState } from "@/components/series/search/search-state";
import {
  recursivelyGrabRandomTvShowsAndRelaseInBulk,
  getTvShowById,
  recursiveAskOnHighRatedShows,
} from "@/services/tv-shows.services";
import {
  combineLatest,
  concatMap,
  map,
  of,
  ReplaySubject,
  startWith,
  take,
} from "rxjs";
import { genres, TvShow } from "./types";

export interface State {
  tvShows: TvShow[];
}

export class GlobalState {
  static state$ = new ReplaySubject<State>();

  static eventSourcing = combineLatest([
    recursivelyGrabRandomTvShowsAndRelaseInBulk(),
    SearchState.searchCameBack$,
    recursiveAskOnHighRatedShows(Math.floor(Math.random() * 260)),
  ])
    .pipe(
      map(([initialFetch, searchIncoming, highRated]) =>
        initialFetch.concat(searchIncoming).concat(highRated)
      )
    )
    .subscribe((s) => this.state$.next({ tvShows: s }));

  static getShowByGenre = (genre: genres) => {
    return this.state$.pipe(
      map((state) =>
        state.tvShows
          .filter((tvshow) => tvshow.genres.includes(genre))
          .sort((a) => (a.genres[0] === genre ? -1 : 1))
      ),
      take(1)
    );
  };

  static getShowsBasedOnRating = (rating: number) => {
    return this.state$.pipe(
      map((state) =>
        state.tvShows.filter((tvshow) => tvshow?.rating?.average > rating)
      ),
      map((el) => [...new Map(el.map((item) => [item["id"], item])).values()]),
      startWith(null)
    );
  };

  static getSingleShow = (id: number) => {
    return this.state$.pipe(
      map((state) => state.tvShows.find((tvshow) => tvshow?.id === id)),
      concatMap((ret) => (ret ? of(ret) : getTvShowById(String(id))))
    );
  };
}
