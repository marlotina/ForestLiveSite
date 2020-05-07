import { SignUp, RequestAccount } from '../../model/Account';

export interface IAccountservices {
    SignUp(request: SignUp): RequestAccount;
}
