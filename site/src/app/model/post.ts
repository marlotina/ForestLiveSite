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
    Id: string;
    PostId:string;
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
    CreationDate: Date;
    LikesCount: number;
    CommentsCount: number;
    ObservationDate: Date;
}