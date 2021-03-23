package de.dhbwvs.student.chatservicebackend.models.payrole;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Getter @Setter @NoArgsConstructor
public class TextMessageDto {

    /**
     * Entity's Attributes
     */
    private @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) Long id;
    private String content;
    private Date timestamp;

    @ManyToOne
    private UserDto sentBy;

    @ManyToOne
    private ChatRoomDto chatRoom;

}
