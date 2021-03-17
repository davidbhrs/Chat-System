import { ChatRoom } from "./chat-room-model";
import { TextMessage } from "./text-message-model";

export class User {

    id: number;
    name: String;

    //Constructor for test purposes
    constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }

}