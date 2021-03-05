package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.UserAlreadyExistsException;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@RestController
@AllArgsConstructor
public class UserController {

    /**
     * Instance of the UserRepository that can manipulate the data inside the database
     */
    private final UserRepository repository;

    /**
     * Method to create a new user if no user with the given name exists
     * <p>
     * Throws UserAlreadyExistsException, when there is a user with the demanded username
     *
     * @param incomingUsername The username the new user should get
     * @return A ResponseEntity with HTTPStatus.OK and the new User in the Body
     */
    @PostMapping("/users/{incomingUsername}")
    public ResponseEntity<User> createNewUser(@PathVariable String incomingUsername) {
        if (!doesUserExist(incomingUsername)) {
            User newUser = repository.save(new User(incomingUsername));
            return ResponseEntity.ok(newUser);
        } else {
            throw(new UserAlreadyExistsException(incomingUsername));
        }
    }

    /**
     * Method checking whether user is persisted in the database
     * <p>
     * Tries to find the User by the given incomingUsername
     *
     * @param incomingUsername The username of the user which shall be found
     * @return A Boolean value which is True when there is a user with this name
     */
    public Boolean doesUserExist(String incomingUsername) {
        Optional<User> user = repository.findByName(incomingUsername);

        return user.isPresent();
    }

    /**
     * Method getting all users stored in the database
     * <p>
     * All users which are stored in the database are considered online
     *
     * @return A ResponseEntity with HTTPStatus.OK and a List of all users
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> listOfUsers = repository.findAll();

        return ResponseEntity.ok(listOfUsers);
    }

    /**
     * Method deleting the user on logOut
     *
     * @param id The id of the user which shall be deleted
     */
    @DeleteMapping("/users/{id}")
    public void logOut(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
