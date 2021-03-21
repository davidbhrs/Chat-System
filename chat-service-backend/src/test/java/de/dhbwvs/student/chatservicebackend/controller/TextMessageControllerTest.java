package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomNotFoundException;
import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
import de.dhbwvs.student.chatservicebackend.repositories.TextMessageRepository;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TextMessageControllerTest {

    private static final String TEST_USERNAME = "Test User";
    private static final String TEST_STRING = "Hello World!";

    private User userInDB;
    private User userInDBToo;
    private UserRepository userRepository;

    private ChatRoom chatRoom;
    private ChatRoomRepository chatRoomRepository;

    private TextMessage newTextMessage;
    private TextMessageRepository textMessageRepository;
    private TextMessageController textMessageController;

    @BeforeAll
    public void setUp() {
        this.userInDB = new User(TEST_USERNAME);
        this.userInDBToo = new User(TEST_USERNAME);
        this.userRepository = Mockito.mock(UserRepository.class);

        this.chatRoom = new ChatRoom(this.userInDB, this.userInDBToo);
        this.chatRoomRepository = Mockito.mock(ChatRoomRepository.class);

        this.newTextMessage = new TextMessage(TEST_STRING, this.userInDB, this.chatRoom);
        this.textMessageRepository = Mockito.mock(TextMessageRepository.class);
    }

    @BeforeEach
    public void init() {
        this.textMessageController =
                new TextMessageController(this.userRepository, this.chatRoomRepository, this.textMessageRepository);
    }

    @Test
    void testErrorIsThrownWhenUserCannotBeFound() {
        // Arrange
        Long unknownId = 42L;

        // Act
        Exception exception = Assertions.assertThrows(UserNotFoundException.class, () ->
            textMessageController.getUserById(unknownId)
        );

        // Assert
        String expectedMessage = String.format("No user with id %d found", unknownId);

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    void testErrorIsThrownWhenChatRoomCannotBeFound() {
        // Arrange
        Long unknownId = 42L;

        // Act
        Exception exception = Assertions.assertThrows(ChatRoomNotFoundException.class, () ->
                textMessageController.getChatRoomByUserAndId(this.userInDB, unknownId)
        );

        // Assert
        String expectedMessage = String.format("No chat room with id %d found", unknownId);

        Assertions.assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    void testPostNewTextMessageSuccess() {
        // Arrange
        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(
                this.userInDB, this.userInDB, this.chatRoom.getId())).thenReturn(Optional.ofNullable(this.chatRoom));
        Mockito.when(this.textMessageRepository.save(Mockito.any())).thenReturn(this.newTextMessage);

        // Act
        ResponseEntity<TextMessage> responseEntity = this.textMessageController.sendNewTextMessage(
                this.userInDB.getId(), this.chatRoom.getId(), TEST_STRING);

        // Assert
        Assertions.assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        Assertions.assertTrue(responseEntity.getBody() instanceof TextMessage);
        Assertions.assertEquals(TEST_STRING, responseEntity.getBody().getContent());
        Assertions.assertEquals(userInDB, responseEntity.getBody().getSentBy());
        Assertions.assertEquals(chatRoom, responseEntity.getBody().getChatRoom());
        Assertions.assertNotNull(responseEntity.getBody().getTimestamp());
    }

    @Test
    void testGetAllTextMessages() {
        // Arrange
        List<TextMessage> listOfTextMessages = new ArrayList<>();
        listOfTextMessages.add(this.newTextMessage);

        Mockito.when(this.userRepository.findById(this.userInDB.getId())).thenReturn(Optional.ofNullable(this.userInDB));
        Mockito.when(this.chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(
                this.userInDB, this.userInDB, this.chatRoom.getId())).thenReturn(Optional.ofNullable(this.chatRoom));
        Mockito.when(this.textMessageRepository.findAllByChatRoom(Mockito.any())).thenReturn(listOfTextMessages);

        // Act
        ResponseEntity<List<TextMessage>> responseEntity =
                this.textMessageController.getAllTextMessagesByChatRoomId(this.userInDB.getId(), this.chatRoom.getId());

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertFalse(responseEntity.getBody().isEmpty());
        Assertions.assertEquals(this.newTextMessage, responseEntity.getBody().get(0));
    }
}
