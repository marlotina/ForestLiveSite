export class PostRequest {
    ImageData: string;
    AltImage: string;
    ImageName: string;
    Title: string;
    Text: string;
    UserId: string;
    UserName:boolean;
    Latitude: string;
    Longitude: string;
    SpecieName: string;
    SpecieId: string;
    Labels: string[];
    ObservationDate: Date;
}

export class PostResponse {
    id:string;
    postId: string;
    title: string;
    text: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    voteCount: number;
    commentCount: number;
    userName: string;
    latitude: number;
    longitude: number;
    labels: string[];
    birdSpecie: string;
    specieId: string;
    userPhoto: string;
    observationDate: string;
    hasVote:boolean;
    voteId: string;
}

export class DeletePost {
    itemId: string;
    userId: string;
    image: string;
}


export class ImagePostRequest {
    imageBase64: string;
    altImage: string;
}

export class BirdSpeciePostResponse {
    id:string;
    postId: string;
    title: string;
    text: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    commentCount: number;
    userName: string;
    birdSpecie: string;
    specieId: string;
    userUrl: string;
    observationDate: string;
    createDate: Date;
    userPhoto: string
}