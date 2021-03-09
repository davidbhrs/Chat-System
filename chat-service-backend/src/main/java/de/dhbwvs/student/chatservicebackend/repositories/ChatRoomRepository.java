package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    /**
     * Abstract method to find all chat rooms in the database where the given user participates
     * <p>
     * The given user is user for participant one and two to match the JpaRepository naming convention
     * <p>
     * The method is implemented automatically by the JpaRepository
     *
     * @param participantOne The user to find all chat rooms where they are participantOne
     * @param participantTwo The user to find all chat rooms where they are participantTwo
     * @return A List containing all chat rooms in the database linked to the given user
     */
    List<ChatRoom> findAllByParticipantOneOrParticipantTwo(User participantOne, User participantTwo);

    /**
     * Abstract method to find a chat rooms in the database by id when the given user participates
     * <p>
     * The given user is user for participant one and two to match the JpaRepository naming convention
     * <p>
     * The method is implemented automatically by the JpaRepository
     *
     * @param participantOne The user to find all chat rooms where they are participantOne
     * @param participantTwo The user to find all chat rooms where they are participantTwo
     * @param id The id of the chat room
     * @return An Optional which either contains a ChatRoom-Object or is empty
     */
    Optional<ChatRoom> findByParticipantOneOrParticipantTwoAndId(User participantOne, User participantTwo, Long id);

    /**
     * Abstract method to delete a chat rooms in the database by id when the given user participates
     * <p>
     * The given user is user for participant one and two to match the JpaRepository naming convention
     * <p>
     * The method is implemented automatically by the JpaRepository
     *
     * @param participantOne The user to find all chat rooms where they are participantOne
     * @param participantTwo The user to find all chat rooms where they are participantTwo
     * @param id The id of the chat room
     */
    void deleteByParticipantOneOrParticipantTwoAndId(User participantOne, User participantTwo, Long id);
}
