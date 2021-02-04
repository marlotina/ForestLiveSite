export class CommentRequest {
    text: string;
    userId: string;
    itemId: string;
}

export class CommentResponse {
    id: string;
    text: string;
    creationDate: string;
    userId: string;
    itemId: string;
    userImage: string;
}