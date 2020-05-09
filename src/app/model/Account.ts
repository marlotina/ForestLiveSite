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