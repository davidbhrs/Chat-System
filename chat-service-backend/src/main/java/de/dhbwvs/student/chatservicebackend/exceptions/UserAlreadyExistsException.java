package de.dhbwvs.student.chatservicebackend.exceptions;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public class UserAlreadyExistsException extends RuntimeException {

    /**
     * Definition of the exception thrown when there is already a user with the given username
     *
     * @param username Username of the user which shall be found
     */
    public UserAlreadyExistsException(String username) {
        super(String.format("User %s already exists", username));
    }

}
