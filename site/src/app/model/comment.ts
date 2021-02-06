export class CommentRequest {
    text: string;
    userId: string;
    postId: string;
}

export class CommentResponse {
    id: string;
    text: string;
    creationDate: string;
    userId: string;
    postId: string;
    userImage: string;
}