package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.UserAlreadyExistsException;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.UserDto;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

    private static final String TEST_USERNAME = "Test User";
    private static final String TEST_USERNAME_NOT_IN_DB = "Nicht in der Datenbank";

    private User user;
    private User newUser;
    private UserController controller;
    private UserRepository repository;

    @BeforeAll
    public void setUp() {
        this.repository = Mockito.mock(UserRepository.class);
        this.user = new User(TEST_USERNAME);
        this.newUser = new User(TEST_USERNAME_NOT_IN_DB);
    }

    @BeforeEach
    public void init() {
        this.controller = new UserController(repository);
    }

    @Test
    void testCreateNewUserGivesPositiveResult() {
        // Arrange
        Mockito.when(this.repository.save(Mockito.any())).thenReturn(this.newUser);

        // Act
        ResponseEntity<UserDto> responseEntity = this.controller.createNewUser(TEST_USERNAME_NOT_IN_DB);

        // Assert
        Assertions.assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        Assertions.assertNotNull(responseEntity.getBody());
    }

    @Test
    void testCreateNewUserThrowsError() {
        // Arrange
        Mockito.when(this.repository.findByName(TEST_USERNAME)).thenReturn(Optional.ofNullable(this.user));

        // Act
        Exception exception = Assertions.assertThrows(UserAlreadyExistsException.class, () ->
            this.controller.createNewUser(TEST_USERNAME)
        );

        // Assert
        String expectedMessage = String.format("User %s already exists", TEST_USERNAME);

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    void testCheckForUserTrue() {
        // Arrange
        Mockito.when(this.repository.findByName(TEST_USERNAME)).thenReturn(Optional.ofNullable(this.user));

        // Act
        Boolean isUserInDB = this.controller.doesUserExist(TEST_USERNAME);

        // Assert
        Assertions.assertTrue(isUserInDB);
    }

    @Test
    void testCheckForUserFalse() {
        // Act
        Boolean isUserInDB = this.controller.doesUserExist(TEST_USERNAME_NOT_IN_DB);

        // Assert
        Assertions.assertFalse(isUserInDB);
    }

    @Test
    void testGetAllUsers() {
        // Arrange
        List<User> listOfUsers = new ArrayList<>();
        listOfUsers.add(this.user);

        Mockito.when(this.repository.findAll()).thenReturn(listOfUsers);

        // Act
        ResponseEntity<List<UserDto>> responseEntity = this.controller.getAllUsers();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertFalse(Objects.requireNonNull(responseEntity.getBody()).isEmpty());
        Assertions.assertEquals(this.user.getId(), responseEntity.getBody().get(0).getId());
    }

    @Test
    void testDeleteUser() {
        // Arrange
        Mockito.when(this.repository.findById(this.user.getId())).thenReturn(Optional.ofNullable(this.user));
        Mockito.doNothing().when(this.repository).deleteById(this.user.getId());

        // Act
        ResponseEntity<UserDto> responseEntity = this.controller.logOut(this.user.getId());

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(this.user.getId(), responseEntity.getBody().getId());
    }

}
