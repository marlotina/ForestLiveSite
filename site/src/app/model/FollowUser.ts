export class FollowUserRequest {
    userId: string;
    followUserId: string;
    userSystemId: string;
}

export class DeleteFollowUserResquest {
    followId: string;
    followUserId: string;
    userSystemId: string;
}

export class FollowUserResponse {
    followerId: string;
}

