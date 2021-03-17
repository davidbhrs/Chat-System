package de.dhbwvs.student.chatservicebackend.models.payrole;

import de.dhbwvs.student.chatservicebackend.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Getter @Setter @NoArgsConstructor
public class ChatRoomDto {

    /**
     * Entity's Attributes
     */
    private Long id;

    @ManyToOne
    private User participantOne;

    @ManyToOne
    private User participantTwo;

}
