import { ChatRoom } from './chat-room-model';
import { User } from './user-model';

export class TextMessage {

    id: number;
    content: string;
    timestamp: Date;
    sentBy: User;
    chatRoom: ChatRoom;
}
