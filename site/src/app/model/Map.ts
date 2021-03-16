export class MapPoint {
    postId: string;
    title: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    location: Position;
    birdSpecie: string;
    specieId: string;
}

export class Position {
    lat: number;
    lng: number;
}