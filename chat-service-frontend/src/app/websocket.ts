import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DataSharingService } from './data-sharing.service';

let stompClient = null;

@Injectable({
    providedIn: 'root'
})
export class Websocket {

    constructor(private dataSharing: DataSharingService) {}

    connect() {
        let socket = new SockJS('/gs-guide-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            getStompClient().subscribe('/topic/chat', (textMessage) => {
                this.dataSharing.addNewestTextMessage(JSON.parse(textMessage.body).body);
            });
            getStompClient().subscribe('/topic/chat-room', (chatRoom) => {
                this.dataSharing.addNewestChatRoom(JSON.parse(chatRoom.body).body);
            });
        });
    }

    disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    sendName(user, chatRoom, content) {
        stompClient.send(`/app/users/${user.id}/chat-rooms/${chatRoom.id}/text-messages`, {}, JSON.stringify(content));
    }

    createChatRoom(participantOne, participantTwo) {
        stompClient.send(`/app/users/${participantOne.id}/chat-rooms`, {}, JSON.stringify({ participantOne, participantTwo }));
    }
}

function getStompClient(): any {
    return stompClient;
}