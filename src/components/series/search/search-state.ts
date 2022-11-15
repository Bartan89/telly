import { getTvShowByQuery } from "@/services/tv-shows.services";
import {
  BehaviorSubject,
  debounceTime,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
} from "rxjs";

export class SearchState {
  static userSearching$ = new BehaviorSubject(false);
  static userInputed$ = new Subject<string>();
  static searchQuery$ = this.userInputed$.pipe(debounceTime(500));

  static searchCameBack$ = this.searchQuery$.pipe(
    switchMap((query) => getTvShowByQuery(query)),
    startWith([])
  );

  static stateOfSearch$ = merge(
    this.userInputed$.pipe(map(() => "started typing")),
    this.searchQuery$.pipe(map(() => "request send")),
    this.searchCameBack$.pipe(map(() => "something came back"))
  );
}
