export class CommentRequest {
    text: string;
    userId: string;
    postId: string;
    specieId: string;
    AuthorPostId: string;
    titlePost: string;
    ImagePost: string;
    parentId: string;
}

export class CommentResponse {
    id: string;
    text: string;
    creationDate: string;
    userId: string;
    postId: string;
    authorPostId: string;
    titlePost: string;
    userImage: string;
    specieId: string;
    parentId:string;
    voteCount: number;
    hasVote: boolean;
    voteId: string;
    replies: CommentResponse[]
}