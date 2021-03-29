import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DataSharingService } from './data-sharing.service';

let stompClient = null;

@Injectable({
    providedIn: 'root'
})
export class Websocket {

    websocketReady: BehaviorSubject<boolean> = new BehaviorSubject(true);

    /**
     * Constructor
     * 
     * @param dataSharing service to exchange data between components
     */
    constructor(private dataSharing: DataSharingService) {}

    /**
     * connecting to the backend websocket
     */
    connect(): void {
        this.websocketReady.next(false);
        const socket = new SockJS('/gs-guide-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            // subscription on resource - new text message is created
            getStompClient().subscribe('/topic/chat', (textMessage) => {
                this.dataSharing.addNewestTextMessage(JSON.parse(textMessage.body).body);
            });
            // subscription on resource - new chat room is created
            getStompClient().subscribe('/topic/chat-room', (chatRoom) => {
                this.dataSharing.addNewestChatRoom(JSON.parse(chatRoom.body).body);
            });
            // subscription on resource - deleted user
            getStompClient().subscribe('/topic/user-delete', (user) => {
                this.dataSharing.announceDeletionOfUser(JSON.parse(user.body).body);
            });
            this.websocketReady.next(true);
        });
    }

    /**
     * disconnecting from the backend websocket
     */
    disconnect(): void {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    /**
     * send a new text message to the websocket
     * 
     * @param user     user sending the message
     * @param chatRoom chat room where the message was sent
     * @param content  the content of the message
     */
    sendName(user, chatRoom, content): void {
        stompClient.send(`/app/users/${user.id}/chat-rooms/${chatRoom.id}/text-messages`, {}, JSON.stringify(content));
    }

    /**
     * sending the participants of a new chat room to create it
     * 
     * @param participantOne user participating in the chat
     * @param participantTwo user participating in the chat
     */
    createChatRoom(participantOne, participantTwo): void {
        stompClient.send(`/app/users/${participantOne.id}/chat-rooms`, {}, JSON.stringify({ participantOne, participantTwo }));
    }

    /**
     * sending the a user which shall be deleted
     */
    deleteUser(user): void {
        stompClient.send(`/app/users/${user.id}`, {}, {});
    }
}

/**
 * function returning the stomp client
 * this is necessary because type script otherwise does not recognize the stomp client in the subscriptions in connect()
 * 
 * @returns the stomp client element necessary to interact with the websocket
 */
function getStompClient(): any {
    return stompClient;
}
