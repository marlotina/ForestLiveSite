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
    isPost: boolean;
    countryCode: string;
}

export class PostResponse {
    id:string;
    postId: string;
    title: string;
    isPost: boolean;
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
    specieUrl: string;
}

export class PostHomeResponse {
    postId: string;
    title: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    birdSpecie: string;
    specieId: string;
    userPhoto: string;
    observationDate: string;
}

export class PostAssignSpecieRequest {
    postId: string;
    specieName: string;
    specieId: string;
}

export class PostUpdateSpecieRequest {
    postId: string;
    specieName: string;
    specieId: string;
    oldSpecieId: string;
}

export class PostAssignSpecieResponse {
    postId: string;
    specieName: string;
    specieId: string;
}

export class PostUpdateLabelsRequest {
    postId: string;
    labels: string[];
}

export class DeletePost {
    itemId: string;
    userId: string;
    image: string;
}

export class ModalPostResponse {
    postId: string;
    title: string;
    text: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    birdSpecie: string;
    specieId: string;
    observationDate: string;
    specieUrl: string;
}

export class ImagePostRequest {
    imageBase64: string;
    altImage: string;
    firstImage: boolean;
}

export class PostListResponse {
    postId: string;
    title: string;
    text: string;
    type: string;
    imageUrl: string;
    altImage: string;
    userId: string;
    voteCount: number;
    commentCount: number;
    labels: string[];
    birdSpecie: string;
    specieId: string;
    specieUrl: string;
    userPhoto: string;
    hasVote:boolean;
    voteId: string;
}