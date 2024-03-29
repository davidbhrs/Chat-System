package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Entity
@Getter @Setter @NoArgsConstructor
public class ChatRoom {

    /**
     * Entity's Attributes
     */
    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;

    @ManyToOne
    private User participantOne;

    @ManyToOne
    private User participantTwo;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<TextMessage> textMessages;


    /**
     * Constructor
     *
     * @param participantOne The first participant of the chat
     * @param participantTwo The second participant of the chat
     */
    public ChatRoom(User participantOne, User participantTwo) {
        this.participantOne = participantOne;
        this.participantTwo = participantTwo;
    }

    /**
     * String-Formatter for class ChatRoom
     *
     * @return A String formatted like this: "ChatRoom(id, participantOne, participantTwo)"
     */
    @Override
    public String toString() {
        return String.format("ChatRoom(%d, %s, %s)", this.id, this.participantOne, this.participantTwo);
    }
}
