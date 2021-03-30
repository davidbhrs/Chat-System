package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Entity
@Getter @Setter @NoArgsConstructor
public class TextMessage {

    /**
     * Entity's Attributes
     */
    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
    @Column(length = 140)
    private String content;
    private Date timestamp;

    @ManyToOne
    private User sentBy;

    @ManyToOne
    private ChatRoom chatRoom;

    /**
     * Constructor
     *
     * @param content The text content of the message
     * @param sentBy The sender of the message
     * @param chatRoom The chat room this message is linked to
     */
    public TextMessage(String content, User sentBy, ChatRoom chatRoom) {
        this.content = content;
        this.timestamp = new Date();
        this.sentBy = sentBy;
        this.chatRoom = chatRoom;
    }

    /**
     * String-Formatter for class ChatRoom
     *
     * @return A String formatted like this: "TextMessage(id, content, timestamp, sentBy, chatRoom)"
     */
    @Override
    public String toString() {
        return String.format("TextMessage(%d, %s, %s, %s, %s)",
                this.id, this.content, this.timestamp, this.sentBy, this.chatRoom);
    }
}
