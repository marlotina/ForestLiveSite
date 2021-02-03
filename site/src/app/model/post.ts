import { SignupRoutingModule } from "../components/account/signup/signup-routing.module";

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
    id: string;
    title: string;
    text: string;
    imageUrl: string;
    userId: string;
    likesCount: number;
    commentsCount: number;
    userName: string;
    latitude: string;
    longitude: string;
    labels: string[];
    birdSpecie: string;
    specieId: string;
    userUrl: string;
    observationDate: Date;
    specieConfirmed:boolean;
}

export class CommentRequest {
    postId: string;
    text: string;
    userId: string;
    userName: string;
}

export class CommentResponse {
    id: string;
    text: string;
    creationDate: string;
    userId: string;
    userName: string;
    userImage: string;
}

export class ImagePostRequest {
    imageBase64: string;
    imageName: string;
    altImage: string;
}
