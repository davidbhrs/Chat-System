package de.dhbwvs.student.chatservicebackend.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super(String.format("No user with id %d found", id));
    }

}
