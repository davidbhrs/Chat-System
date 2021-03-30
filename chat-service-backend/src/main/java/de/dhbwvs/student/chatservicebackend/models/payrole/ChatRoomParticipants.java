package de.dhbwvs.student.chatservicebackend.models.payrole;

import de.dhbwvs.student.chatservicebackend.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Getter @AllArgsConstructor
public class ChatRoomParticipants {

    /**
     * Entity's Attributes
     */
    private User participantOne;
    private User participantTwo;

}
