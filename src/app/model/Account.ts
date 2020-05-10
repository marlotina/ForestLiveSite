export class SignUp {
    Email: string;
    Password: string;
    UserName: string;
    LanguageId: string;
}

export class ConfirmEmailRequest {
    Code: string;
    UserId: string;
}

export class ForgotRequest {
    Email: string;
}

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}