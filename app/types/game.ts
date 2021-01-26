export type Platform = {
  id: any;
  name: string;
  abbreviation: string;
};

export type Genre = {
  id: any;
  name: string;
};

export type GameType = {
  id: any;
  name: string;
  cover?: string;
  thumbnail?: string;
  genres: Genre[];
  platforms: Platform[];
};
