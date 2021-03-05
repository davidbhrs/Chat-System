package de.dhbwvs.student.chatservicebackend.controller;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class ChatRoomController {

    private final ChatRoomRepository repository;

    @PostMapping("/chat-rooms")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody User participantOne, @RequestBody User participantTwo) {
        ChatRoom newChatRoom = repository.save(new ChatRoom(participantOne, participantTwo));
        return new ResponseEntity(newChatRoom, HttpStatus.CREATED);
    }

    @GetMapping("/chat-rooms")
    public ResponseEntity<List<ChatRoom>> getAllChatRooms() {
        List<ChatRoom> listOfChatRooms = repository.findAll();
        return ResponseEntity.ok(listOfChatRooms);
    }

    @GetMapping("/chat-rooms/{id}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Long id) {
        Optional<ChatRoom> chatRoom = repository.findById(id);
        if (chatRoom.isPresent()) {
            return ResponseEntity.ok(chatRoom.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("/chat-rooms/{id}")
    public void deleteChatRoomsById(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
