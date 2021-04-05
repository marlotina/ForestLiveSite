export class CommentRequest {
    text: string;
    userId: string;
    postId: string;
    specieId: string;
    authorPostUserId: string;
    titlePost: string;
    parentCommentId: string;
}

export class CommentResponse {
    id: string;
    text: string;
    creationDate: string;
    userId: string;
    postId: string;
    authorPostUserId: string;
    titlePost: string;
    userImage: string;
    specieId: string;
    parentCommentId:string;
    replies: CommentResponse[]
}