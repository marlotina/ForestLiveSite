export class PostRequest {
    imageData: string;
    altImage: string;
    imageName: string;
    title: string;
    text: string;
    userId: string;
    userName:boolean;
    latitude: string;
    longitude: string;
    specieName: string;
    specieId: string;
    labels: string[];
    observationDate: Date;
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
    firstImage: boolean;
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
    creationDate: Date;
    userPhoto: string
}