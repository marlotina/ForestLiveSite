export class VoteRequest {
    postId: string;
    title: string;
    userId: string;
    vote: number;
    ownerUserId: string;
    specieId: string;
}

export class VoteResponse {
    Id: string;
    title: string;
    userId: string;
    vote: number;
    ownerUserId: string;
    postId: string;
    CreationDate: Date;
}