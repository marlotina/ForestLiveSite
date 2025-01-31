export class UserRequest {
    id: string;
    userName: string;
    name: string;
    surname: string;
    urlWebSite: string;
    isCompany:boolean;
    languageId: string;
    description: string;
    photo: string;
    location: string;
}

export class UserResponse {
    id: string;
    email: string;
    userName: string;
    name: string;
    surname: string;
    urlWebSite: string;
    lastModification: Date;
    isCompany:boolean;
    registrationDate: Date;
    languageId: string;
    description: string;
    photo: string;
    location: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedlinUrl: string;
    facebookUrl: string;
    latitude: number;
    longitude: number;
}

export class UserMapResponse {
    latitude: number;
    longitude: number;
}

export class UserInfoResponse {
    id: string;
    userName: string;
    urlWebSite: string;
    //lastModification: Date;
    isCompany:boolean;
    registrationDate: Date;
    //languageId: string;
    description: string;
    photo: string;
    location: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedlinUrl: string;
    facebookUrl: string;
    followerCount: number;
    hasFollow: boolean;
    followId: string;
}

export class UserListResponse {
    id: string;
    userName: string;
    urlWebSite: string;
    lastModification: Date;
    isCompany:boolean;
    registrationDate: Date;
    languageId: string;
    description: string;
    photo: string;
    location: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedlinUrl: string;
    facebookUrl: string;
}

export class UserAutocompleteResponse {
    userName: string;
    userPhoto: string;
}

export class ForgotRequest {
    Email: string;
}

export class ImageProfileRequest {
    imageBase64: string;
    imageName: string;
    userId: string;
    hasImage: boolean;
}

export class UserLabelRequest {
    userId: string;
    label: string;
}

export class UserLabelResponse {
    userId: string;
    label: string;
    postCount: number;
    creationDate: string;
}

export class UserLabelPageResponse {
    id: string;
    postCount: number;
}