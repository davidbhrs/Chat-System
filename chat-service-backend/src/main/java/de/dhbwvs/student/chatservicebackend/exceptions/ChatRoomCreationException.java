package de.dhbwvs.student.chatservicebackend.exceptions;

public class ChatRoomCreationException extends RuntimeException {

    public ChatRoomCreationException() {
        super("Chat room could not be created.");
    }
}
