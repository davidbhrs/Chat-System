package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TextMessageRepository extends JpaRepository<TextMessage, Long> {

    List<TextMessage> findAllByChatRoom(ChatRoom chatRoom);

}
