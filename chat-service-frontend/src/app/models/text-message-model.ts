import { ChatRoom } from './chat-room-model';
import { User } from './user-model';

export class TextMessage {

    /** Class properties */
    id: number;
    content: string;
    timestamp: Date;
    sentBy: User;
    chatRoom: ChatRoom;

    /**
     * Constructor
     * @param id        numeric id of the text message
     * @param content   string message content
     * @param timestamp date - timestamp the text message was sent
     * @param sentBy    user who sent the text message
     * @param chatRoom  chat room where the text message was sent
     */
    constructor(id: number, content: string, timestamp: Date, sentBy: User, chatRoom: ChatRoom) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.sentBy = sentBy;
        this.chatRoom = chatRoom;
    }
}
