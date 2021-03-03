package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
     * Method checking whether user is persisted in the database
     * <p>
     * Tries to find the User by the given incomingUsername, if there is no User with this name
     * a UserNotFoundException is thrown
     *
     * @param incomingUsername The username of the user which shall be found
     * @return A ResponseEntity with HTTPStatus.OK and the User in the Body
     */
    @GetMapping("/users")
    public ResponseEntity<User> checkForUser(@RequestBody String incomingUsername) {
        User user = repository.findByName(incomingUsername)
            .orElseThrow(() -> new UserNotFoundException(incomingUsername));

        return ResponseEntity.ok(user);
    }
}
