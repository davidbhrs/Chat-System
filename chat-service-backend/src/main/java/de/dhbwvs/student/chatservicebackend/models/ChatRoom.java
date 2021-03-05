package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @NoArgsConstructor
public class ChatRoom {

    private @Id @GeneratedValue Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User participantOne;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User participantTwo;

    public ChatRoom(User participantOne, User participantTwo) {
        this.participantOne = participantOne;
        this.participantTwo = participantTwo;
    }

}
