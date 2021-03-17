package de.dhbwvs.student.chatservicebackend.models.payrole;

import de.dhbwvs.student.chatservicebackend.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Getter @Setter @NoArgsConstructor
public class ChatRoomPayRole {

    /**
     * Entity's Attributes
     */
    private @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) Long id;

    @ManyToOne
    private User participantOne;

    @ManyToOne
    private User participantTwo;

}
