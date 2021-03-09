package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public interface TextMessageRepository extends JpaRepository<TextMessage, Long> {

    /**
     * Abstract method to find all text messages in the database linked to a chatroom
     * <p>
     * The method is implemented automatically by the JpaRepository
     *
     * @param chatRoom The chat room object for which the text messages shall be found
     * @return A List containing all text messages in the database linked to the given chatroom
     */
    List<TextMessage> findAllByChatRoom(ChatRoom chatRoom);

}
