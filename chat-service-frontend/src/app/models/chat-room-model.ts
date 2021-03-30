import { User } from './user-model';

export class ChatRoom {

    /** Class Properties */
    id: number;
    participantOne: User;
    participantTwo: User;

    /**
     * Constructor
     *
     * @param id             numeric id of the chat room
     * @param participantOne user object participating in the chat
     * @param participantTwo user object participating in the chat
     */
    constructor(id: number, participantOne: User, participantTwo: User) {
        this.id = id;
        this.participantOne = participantOne;
        this.participantTwo = participantTwo;
    }
}
