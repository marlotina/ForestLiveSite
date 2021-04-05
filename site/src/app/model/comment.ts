export class CommentRequest {
    text: string;
    userId: string;
    postId: string;
    specieId: string;
    authorPostUserId: string;
    titlePost: string;
    commentParentId: string;
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
    parentId:string;
    replies: CommentResponse[]
}