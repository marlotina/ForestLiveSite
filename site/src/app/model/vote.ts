export class VoteRequest {
    postId: string;
    userId: string;
    authorPostId: string;
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
    authorPostId: string;
    titlePost: string;
    specieId: string
}

export class CommentVoteRequest {
    postId: string;
    userId: string;
    authorPostId: string;
    text: string;
    commentId: string;
}

export class CommentVoteResponse {
    id: string;
    title: string;
    userId: string;
    vote: number;
    postId: string;
    creationDate: string;
    authorPostId: string;
    titlePost: string;
    specieId: string
}
