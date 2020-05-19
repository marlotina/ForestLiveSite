export class SignUp {
    email: string;
    password: string;
    userName: string;
    languageId: string;
}

export class ConfirmEmailRequest {
    code: string;
    userId: string;
}

export class ForgotRequest {
    email: string;
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

export class UserStorage {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export class ResetPasswordRequest {
    userId: string;
    newPassword: string;
    code: string;
}
