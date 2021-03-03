package de.dhbwvs.student.chatservicebackend.exceptions;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Definition of the exception thrown when there is no user found with the given username
     *
     * @param username Username of the user which shall be found
     */
    public UserNotFoundException(String username) {
        super("Could not find user " + username);
    }

}
