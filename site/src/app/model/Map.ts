export class MapPoint {
    postId: string;
    location: Position;
}

export class MapSpeciePoint {
    postId: string;
    specieId: string;
    location: Position;
}

export class Position {
    lat: number;
    lng: number;
}