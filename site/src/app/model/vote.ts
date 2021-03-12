export class VoteRequest {
    postId: string;
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
    creationDate: string;
    authorPostUserId: string;
    titlePost: string;
}