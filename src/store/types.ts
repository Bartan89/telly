export interface TvShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel?: null;
  dvdCountry?: null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
}
export interface Schedule {
  time: string;
  days?: string[] | null;
}
export interface Rating {
  average: number;
}
export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}
export interface Country {
  name: string;
  code: string;
  timezone: string;
}
export interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}
export interface Image {
  medium: string;
  original: string;
}
export interface Links {
  self: SelfOrPreviousepisode;
  previousepisode: SelfOrPreviousepisode;
}
export interface SelfOrPreviousepisode {
  href: string;
}

// this type was extracted using type-generation/genres-types.ts (can be triggered in src/components/series/dashboard/DashboardComponent.vue)
export type genres =
  | "Comedy"
  | "Drama"
  | "Action"
  | "Fantasy"
  | "Science-Fiction"
  | "Adventure"
  | "Crime"
  | "War"
  | "History"
  | "Romance"
  | "Thriller"
  | "Mystery"
  | "Food"
  | "Children"
  | "Anime"
  | "Family"
  | "Travel"
  | "Supernatural"
  | "Medical"
  | "Music"
  | "Sports"
  | "DIY"
  | "Horror"
  | "Western"
  | "Nature"
  | "Espionage"
  | "Legal";
