export class VoteRequest {
    postId: string;
    title: string;
    userId: string;
    authorPostUserId: string;
    titlePost: string;
}

export class VoteResponse {
    Id: string;
    title: string;
    userId: string;
    vote: number;
    postId: string;
    creationDate: Date;
    authorPostUserId: string;
    titlePost: string;
}