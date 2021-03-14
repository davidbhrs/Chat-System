package de.dhbwvs.student.chatservicebackend.exceptions;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public class ChatRoomCreationException extends RuntimeException {

    /**
     * Definition of the exception which is thrown when a chat room cannot be created
     */
    public ChatRoomCreationException() {
        super("Chat room could not be created.");
    }
}
