package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomNotFoundException;
import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
import de.dhbwvs.student.chatservicebackend.repositories.TextMessageRepository;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@RestController
@AllArgsConstructor
public class TextMessageController {

    /**
     * Instance of all repositories that can manipulate the data inside the database
     */
    private UserRepository userRepository;
    private ChatRoomRepository chatRoomRepository;
    private TextMessageRepository textMessageRepository;

    /**
     * Method to persist a new text message
     * <p>
     * Throws UserNotFoundException, when the user causing the request does not exist in the database
     * <p>
     * Throws ChatRoomNotFoundException, when the chat room causing the request does not exist in the database
     *
     * @param userId The id of the user sending the message
     * @param chatRoomId The id of the chat room in which the message was sent
     * @param textMessage The string message which was sent
     * @return A ResponseEntity with HTTPStatus.CREATED and the new TextMessage in the Body
     */
    @PostMapping("/users/{userId}/chat-rooms/{chatRoomId}/text-messages")
    public ResponseEntity<TextMessage> sendNewTextMessage(
            @PathVariable Long userId,
            @PathVariable Long chatRoomId,
            @RequestBody String textMessage
    ) {
        User user = getUserById(userId);

        ChatRoom chatRoom = getChatRoomByUserAndId(user, chatRoomId);

        TextMessage newTextMessage = textMessageRepository.save(new TextMessage(textMessage, user, chatRoom));
        return new ResponseEntity(newTextMessage, HttpStatus.CREATED);
    }

    /**
     * Method to get all text messages for a chat room out of the database
     * <p>
     * Throws UserNotFoundException, when the user causing the request does not exist in the database
     * <p>
     * Throws ChatRoomNotFoundException, when the chat room causing the request does not exist in the database
     *
     * @param userId The id of the user participating in the chat
     * @param chatRoomId The id of the chat room
     * @return A ResponseEntity with HTTPStatus.OK and the a List of TextMessages in the Body
     */
    @GetMapping("/users/{userId}/chat-rooms/{chatRoomId}/text-messages")
    public ResponseEntity<List<TextMessage>> getAllTextMessagesByChatRoomId(
            @PathVariable Long userId,
            @PathVariable Long chatRoomId
    ) {
        User user = getUserById(userId);

        ChatRoom chatRoom = getChatRoomByUserAndId(user, chatRoomId);

        List<TextMessage> listOfTextMessages = textMessageRepository.findAllByChatRoom(chatRoom);
        return ResponseEntity.ok(listOfTextMessages);
    }

    /**
     * Method trying to find a user by the given id
     * <p>
     * Throws a UserNotFoundException if there is no user with the given id
     *
     * @param id The id of the user to be found
     * @return User with the given id
     * @throws UserNotFoundException
     */
    public User getUserById(Long id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    /**
     * Method trying to find a chat room by the given user entity and id
     * <p>
     * Throws a ChatRoomNotFoundException if there is no chat room with the given user entity or id
     *
     * @param user The user that participates in the chat which shall be found
     * @param id The id of the chat room to be found
     * @return ChatRoom with the given id
     * @throws ChatRoomNotFoundException
     */
    public ChatRoom getChatRoomByUserAndId(User user, Long id) throws ChatRoomNotFoundException {
        return chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(user, user, id)
                .orElseThrow(() -> new ChatRoomNotFoundException(id));
    }

}
