package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @NoArgsConstructor
public class ChatRoom {

    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User participantOne;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User participantTwo;

    public ChatRoom(User participantOne, User participantTwo) {
        this.participantOne = participantOne;
        this.participantTwo = participantTwo;
    }

    @Override
    public String toString() {
        return String.format("ChatRoom(%d, %s, %s)", this.id, this.participantOne, this.participantTwo);
    }
}
