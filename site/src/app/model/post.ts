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
    id:string;
    postId: string;
    title: string;
    text: string;
    imageUrl: string;
    altImage: string;
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
    observationDate: string;
    specieConfirmed:boolean;
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
