export class FollowUserRequest {
    userId: string;
    followUserId: string;
}

export class DeleteFollowUserResquest {
    followId: string;
    followUserId: string;
}

export class FollowUserResponse {
    followerId: string;
}

export class FollowListResponse {
    id: string;
    followUserId: string;
    userId: string;
    creationDate: Date;
}
