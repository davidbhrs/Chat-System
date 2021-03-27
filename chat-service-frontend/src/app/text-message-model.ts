import { ChatRoom } from './chat-room-model';
import { User } from './user-model';

export class TextMessage {

    id: number;
    content: string;
    timestamp: Date;
    sentBy: User;
    chatRoom: ChatRoom;

    // constructor for test purposes
    constructor(id: number, content: string, timestamp: Date, sentBy: User, chatRoom: ChatRoom) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.sentBy = sentBy;
        this.chatRoom = chatRoom;
    }
}
