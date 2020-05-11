export class UserRequest {
    id: string;
    email: string;
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
}

export class ForgotRequest {
    Email: string;
}