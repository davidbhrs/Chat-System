package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerTest {

    private static final String TEST_USERNAME = "Test User";
    private static final String TEST_USERNAME_NOT_IN_DB = "Nicht in der Datenbank";

    private User user;
    private UserController controller;
    private UserRepository repository;

    @BeforeAll
    public void setUp() {
        this.repository = Mockito.mock(UserRepository.class);
        this.user = new User(TEST_USERNAME);
    }

    @BeforeEach
    public void init() {
        this.controller = new UserController(repository);
    }

    @Test
    public void testCheckForUserGivesPositiveResult() {
        // Arrange
        Mockito.when(this.repository.findByName(TEST_USERNAME)).thenReturn(Optional.ofNullable(this.user));

        // Act
        ResponseEntity<User> responseEntity = this.controller.checkForUser(TEST_USERNAME);

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(this.user, responseEntity.getBody());
    }

    @Test
    public void testCheckForUserThrowsError() {
        // Act
        Exception exception = Assertions.assertThrows(UserNotFoundException.class, () ->
                this.controller.checkForUser(TEST_USERNAME_NOT_IN_DB)
        );

        // Assert
        String expectedMessage = String.format("Could not find user %s", TEST_USERNAME_NOT_IN_DB);

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> listOfUsers = new ArrayList<>();
        listOfUsers.add(this.user);

        Mockito.when(this.repository.findAll()).thenReturn(listOfUsers);

        // Act
        ResponseEntity<List<User>> responseEntity = this.controller.getAllUsers();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertFalse(responseEntity.getBody().isEmpty());
        Assertions.assertEquals(this.user, responseEntity.getBody().get(0));
    }

}
