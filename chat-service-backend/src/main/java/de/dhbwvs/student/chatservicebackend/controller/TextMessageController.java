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

@RestController
@AllArgsConstructor
public class TextMessageController {

    private UserRepository userRepository;
    private ChatRoomRepository chatRoomRepository;
    private TextMessageRepository textMessageRepository;

    @PostMapping("/users/{userId}/chat-rooms/{chatRoomId}/text-messages")
    public ResponseEntity<TextMessage> sendNewTextMessage(@PathVariable Long userId, @PathVariable Long chatRoomId, @RequestBody String textMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ChatRoom chatRoom = chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        TextMessage newTextMessage = textMessageRepository.save(new TextMessage(textMessage, user, chatRoom));
        return new ResponseEntity(newTextMessage, HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/chat-rooms/{chatRoomId}/text-messages")
    public ResponseEntity<List<TextMessage>> getAllTextMessagesByChatRoomId(@PathVariable Long userId, @PathVariable Long chatRoomId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ChatRoom chatRoom = chatRoomRepository.findByParticipantOneOrParticipantTwoAndId(user, user, chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        List<TextMessage> listOfTextMessages = textMessageRepository.findAllByChatRoom(chatRoom);
        return ResponseEntity.ok(listOfTextMessages);
    }

}
