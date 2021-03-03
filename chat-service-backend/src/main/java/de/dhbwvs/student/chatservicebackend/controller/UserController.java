package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserRepository repository;

    @GetMapping("/users")
    public ResponseEntity<User> checkForUser(@RequestBody String incomingUsername) {
        User user = repository.findByName(incomingUsername)
            .orElseThrow(() -> new UserNotFoundException(incomingUsername));

        return ResponseEntity.ok(user);
    }
}
