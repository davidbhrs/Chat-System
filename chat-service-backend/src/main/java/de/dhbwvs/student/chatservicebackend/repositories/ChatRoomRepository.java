package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findAllByParticipantOneOrParticipantTwo(User participantOne, User participantTwo);
    Optional<ChatRoom> findByParticipantOneOrParticipantTwoAndId(User participantOne, User participantTwo, Long id);

    void deleteByParticipantOneOrParticipantTwoAndId(User participantOne, User participantTwo, Long id);

}
