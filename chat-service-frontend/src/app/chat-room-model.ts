import { TextMessage } from "./text-message-model";
import { User } from "./user-model";

export class ChatRoom {

    id: number;
    participantOne: User;
    participantTwo: User;

}