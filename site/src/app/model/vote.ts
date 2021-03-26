export class VoteRequest {
    postId: string;
    userId: string;
    authorPostUserId: string;
    titlePost: string;
    specieId: string;
}

export class VoteResponse {
    id: string;
    title: string;
    userId: string;
    vote: number;
    postId: string;
    creationDate: string;
    authorPostUserId: string;
    titlePost: string;
    specieId: string
}