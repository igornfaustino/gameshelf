export type Platform = {
  id: any;
  name: string;
  abbreviation: string;
};

export type GameType = {
  id: any;
  name: string;
  cover?: string;
  genres: {
    id: any;
    name: string;
  };
  platforms: Platform[];
};
