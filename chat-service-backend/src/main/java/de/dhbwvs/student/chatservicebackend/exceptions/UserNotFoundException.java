package de.dhbwvs.student.chatservicebackend.exceptions;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Definition of the exception which is thrown when the user cannot be found
     *
     * @param id Identifier of the user
     */
    public UserNotFoundException(Long id) {
        super(String.format("No user with id %d found", id));
    }

}
