import { TextMessage } from "./text-message-model";
import { User } from "./user-model";

export class ChatRoom {

    id: number;
    participantOne: User;
    participantTwo: User;

    //Constructor for test purposes
    constructor(id: number, participantOne: User, participantTwo: User) {
        this.id = id;
        this.participantOne = participantOne;
        this.participantTwo = participantTwo;
    }
}