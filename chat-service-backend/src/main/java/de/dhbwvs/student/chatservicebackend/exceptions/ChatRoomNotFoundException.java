package de.dhbwvs.student.chatservicebackend.exceptions;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public class ChatRoomNotFoundException extends RuntimeException {

    /**
     * Definition of the exception which is thrown when the chat room cannot be found
     *
     * @param id Identifier of the chat room
     */
    public ChatRoomNotFoundException(Long id) {
        super(String.format("No chat room with id %d found", id));
    }

}
