package de.dhbwvs.student.chatservicebackend.exceptions;

public class ChatRoomNotFoundException extends RuntimeException {

    public ChatRoomNotFoundException(Long id) {
        super(String.format("No chat room with id %d found", id));
    }

}
