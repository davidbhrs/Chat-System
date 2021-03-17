import { ChatRoom } from "./chat-room-model";
import { User } from "./user-model";

export class TextMessage {

    id: number;
    content: String;
    timestamp: Date;
    sentBy: User;
    chatRoom: ChatRoom;

}