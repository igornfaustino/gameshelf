export type GameType = {
  id: any;
  name: string;
  cover?: string;
  genres: {
    id: any;
    name: string;
  };
  platforms: {
    id: any;
    name: string;
    abbreviation: string;
  };
};
