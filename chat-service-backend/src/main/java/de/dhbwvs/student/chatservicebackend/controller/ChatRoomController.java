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

    @PostMapping("/users/{userId}/chat-rooms")
    public ResponseEntity<ChatRoom> createChatRoom(
            @PathVariable Long userId,
            @RequestBody User participantOne,
            @RequestBody User participantTwo
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if (participantOne == participantTwo || (user != participantOne && user != participantTwo)) {
            throw new ChatRoomCreationException();
        } else {
            ChatRoom newChatRoom = chatRoomRepository.save(new ChatRoom(participantOne, participantTwo));
            return new ResponseEntity(newChatRoom, HttpStatus.CREATED);
        }
    }

    @GetMapping("/users/{userId}/chat-rooms")
    public ResponseEntity<List<ChatRoom>> getAllChatRoomsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        List<ChatRoom> listOfChatRooms = chatRoomRepository.findAllByParticipantOneOrParticipantTwo(user, user);
        return ResponseEntity.ok(listOfChatRooms);
    }

    @GetMapping("/users/{userId}/chat-rooms/{chatRoomId}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Long userId, @PathVariable Long chatRoomId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ChatRoom chatRoom = chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
        return ResponseEntity.ok(chatRoom);
    }

    @DeleteMapping("/users/{userId}/chat-rooms/{chatRoomId}")
    public void deleteChatRoomsById(@PathVariable Long userId, @PathVariable Long chatRoomId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        chatRoomRepository.deleteByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId);
    }

}
