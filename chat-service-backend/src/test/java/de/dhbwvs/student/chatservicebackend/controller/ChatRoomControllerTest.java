package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomCreationException;
import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomNotFoundException;
import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomParticipants;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ChatRoomControllerTest {

    private static final String TEST_USERNAME = "Test User";
    private static final String TEST_USERNAME_TWO = "Test User Two";
    private static final String TEST_USERNAME_NOT_IN_DB = "Nicht in der Datenbank";

    private User userInDB;
    private User userInDBToo;
    private User userNotInDB;
    private User userNotInDBToo;
    private UserRepository userRepository;

    private ChatRoom newChatRoom;
    private ChatRoomRepository chatRoomRepository;
    private ChatRoomController controller;

    @BeforeAll
    public void setUp() {
        this.userRepository = Mockito.mock(UserRepository.class);
        this.userInDB = new User(TEST_USERNAME);
        this.userInDBToo = new User(TEST_USERNAME_TWO);
        this.userNotInDB = new User(TEST_USERNAME_NOT_IN_DB);
        this.userNotInDBToo = new User(TEST_USERNAME_NOT_IN_DB);

        this.newChatRoom = new ChatRoom(this.userInDB, userInDBToo);
        this.chatRoomRepository = Mockito.mock(ChatRoomRepository.class);
    }

    @BeforeEach
    public void init() {
        this.controller = new ChatRoomController(this.userRepository, this.chatRoomRepository);
    }

    @Test
    public void testErrorIsThrownWhenUserCannotBeFound() {
        // Arrange
        Long unknownId = 42L;

        // Act
        Exception exception = Assertions.assertThrows(UserNotFoundException.class, () ->
            this.controller.getUserById(unknownId)
        );

        // Assert
        String expectedMessage = String.format("No user with id %d found", unknownId);

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    public void testCreateChatRoomThrowsErrorWhenTheUsersAreEqual() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        ChatRoomParticipants chatRoomParticipants = new ChatRoomParticipants(userInDB, userInDB);

        // Act
        Exception exception = Assertions.assertThrows(ChatRoomCreationException.class, () ->
                this.controller.createChatRoom(userInDB.getId(), chatRoomParticipants)
        );

        // Assert
        String expectedMessage = "Chat room could not be created.";

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    public void testCreateChatRoomThrowsErrorWhenUsersDoNotMatchTheId() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        ChatRoomParticipants chatRoomParticipants = new ChatRoomParticipants(userNotInDB, userNotInDBToo);

        // Act
        Exception exception = Assertions.assertThrows(ChatRoomCreationException.class, () ->
                this.controller.createChatRoom(userInDB.getId(), chatRoomParticipants)
        );

        // Assert
        String expectedMessage = "Chat room could not be created.";

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    public void testCreateChatRoomSuccess() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.save(Mockito.any())).thenReturn(this.newChatRoom);
        ChatRoomParticipants chatRoomParticipants = new ChatRoomParticipants(userInDB, userInDBToo);

        // Act
        ResponseEntity<ChatRoomDto> responseEntity =
                this.controller.createChatRoom(userInDB.getId(), chatRoomParticipants);

        // Assert
        Assertions.assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(userInDB, responseEntity.getBody().getParticipantOne());
        Assertions.assertEquals(userInDBToo, responseEntity.getBody().getParticipantTwo());
    }

    @Test
    public void testGetAllChatRoomsByUser() {
        // Arrange
        List<ChatRoom> listOfChatRooms = new ArrayList<>();
        listOfChatRooms.add(this.newChatRoom);

        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.findAllByParticipantOneOrParticipantTwo(Mockito.any(), Mockito.any()))
                .thenReturn(listOfChatRooms);

        // Act
        ResponseEntity<List<ChatRoomDto>> responseEntity =
                this.controller.getAllChatRoomsByUser(userInDB.getId());

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertFalse(Objects.requireNonNull(responseEntity.getBody()).isEmpty());
        Assertions.assertEquals(this.newChatRoom.getId(), responseEntity.getBody().get(0).getId());
    }

    @Test
    public void testGetChatRoomByIdFails() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(
                userInDB, userInDB, this.newChatRoom.getId())).thenReturn(Optional.empty());

        // Act
        Exception exception = Assertions.assertThrows(ChatRoomNotFoundException.class, () ->
                this.controller.getChatRoomById(userInDB.getId(), newChatRoom.getId())
        );

        // Assert
        String expectedMessage = String.format("No chat room with id %d found", newChatRoom.getId());

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    public void testGetChatRoomByIdSuccess() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(
                userInDB, userInDB, this.newChatRoom.getId())).thenReturn(Optional.ofNullable(this.newChatRoom));

        // Act
        ResponseEntity<ChatRoomDto> responseEntity = this.controller.getChatRoomById(userInDB.getId(), newChatRoom.getId());

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(userInDB, responseEntity.getBody().getParticipantOne());
        Assertions.assertEquals(userInDBToo, responseEntity.getBody().getParticipantTwo());
    }

}
