package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
