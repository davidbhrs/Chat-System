package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomCreationException;
import de.dhbwvs.student.chatservicebackend.exceptions.ChatRoomNotFoundException;
import de.dhbwvs.student.chatservicebackend.exceptions.UserNotFoundException;
import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
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
public class ChatRoomController {

    /**
     * Instance of the user and chat room repositories that can manipulate the data inside the database
     */
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

    /**
     * Method to persist a new chat room
     * <p>
     * Throws UserNotFoundException, when the user causing the request does not exist in the database
     * <p>
     * Throws ChatRoomCreationException, when the users are equal or none of the users is equal to the user that is found
     *
     * @param userId Id of the user that caused the request
     * @param participantOne User entity participating in the new chat room
     * @param participantTwo User entity participating in the new chat room
     * @return A ResponseEntity with HTTPStatus.CREATED and the new ChatRoom in the Body
     */
    @PostMapping("/users/{userId}/chat-rooms")
    public ResponseEntity<ChatRoom> createChatRoom(
            @PathVariable Long userId,
            @RequestBody User participantOne,
            @RequestBody User participantTwo
    ) {
        User user = getUserById(userId);

        if (participantOne == participantTwo || (user != participantOne && user != participantTwo)) {
            throw new ChatRoomCreationException();
        } else {
            ChatRoom newChatRoom = chatRoomRepository.save(new ChatRoom(participantOne, participantTwo));
            return new ResponseEntity(newChatRoom, HttpStatus.CREATED);
        }
    }

    /**
     * Method to get all chat rooms for a user out of the database
     * <p>
     * Throws UserNotFoundException, when the user causing the request does not exist in the database
     *
     * @param userId The id of the user participating in the chats
     * @return A ResponseEntity with HTTPStatus.OK and the a List of ChatRooms in the Body
     */
    @GetMapping("/users/{userId}/chat-rooms")
    public ResponseEntity<List<ChatRoom>> getAllChatRoomsByUser(@PathVariable Long userId) {
        User user = getUserById(userId);

        List<ChatRoom> listOfChatRooms = chatRoomRepository.findAllByParticipantOneOrParticipantTwo(user, user);
        return ResponseEntity.ok(listOfChatRooms);
    }

    /**
     * Method to get a chat rooms for a user by the given id out of the database
     * <p>
     * Throws UserNotFoundException, when the user causing the request does not exist in the database
     * <p>
     * Throws ChatRoomNotFoundException, when there is no chat room with the given id in the database
     *
     * @param userId The id of the user participating in the chat
     * @param chatRoomId The id of the chat room which shall be found
     * @return A ResponseEntity with HTTPStatus.OK and the a ChatRooms in the Body
     */
    @GetMapping("/users/{userId}/chat-rooms/{chatRoomId}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Long userId, @PathVariable Long chatRoomId) {
        User user = getUserById(userId);

        ChatRoom chatRoom = chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
        return ResponseEntity.ok(chatRoom);
    }

    /**
     * Method deleting the user on logOut
     *
     * @param userId The id of the user which requested the deletion
     * @param chatRoomId The id of the chat room which shall be deleted
     */
    @DeleteMapping("/users/{userId}/chat-rooms/{chatRoomId}")
    public void deleteChatRoomsById(@PathVariable Long userId, @PathVariable Long chatRoomId) {
        User user = getUserById(userId);

        chatRoomRepository.deleteByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId);
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

}
