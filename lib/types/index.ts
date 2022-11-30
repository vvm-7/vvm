export type GameData = {
  gameId: number;
  bannerSource: string;
  videoData: string[];
};

export type Games = {
  gameId: number;
  imageSource: string;
  gameTitle: string;
  genre: string[];
  gameData: GameData;
};

export type ApiDataType = {
  data: Games[];
};

export type CarouselData = {
  carouselId: string;
  cardData: Games[];
};

export type GENRE = "Ongoing" | "Action" | "Racing" | "StayTuned";
