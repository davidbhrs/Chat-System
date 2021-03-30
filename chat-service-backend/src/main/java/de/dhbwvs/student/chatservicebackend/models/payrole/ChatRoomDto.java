package de.dhbwvs.student.chatservicebackend.models.payrole;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private UserDto participantOne;

    @ManyToOne
    private UserDto participantTwo;

}
