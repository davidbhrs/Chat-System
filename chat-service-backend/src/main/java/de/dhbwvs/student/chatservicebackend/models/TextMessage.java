package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @NoArgsConstructor
public class TextMessage {

    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
    private String content;
    private Date timestamp;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User sentBy;

    @OneToOne(cascade = CascadeType.REMOVE)
    private ChatRoom chatRoom;

    public TextMessage(String content, User sentBy, ChatRoom chatRoom) {
        this.content = content;
        this.timestamp = new Date();
        this.sentBy = sentBy;
        this.chatRoom = chatRoom;
    }

    @Override
    public String toString() {
        return String.format("TextMessage(%d, %s, %s, %s, %s)",
                this.id, this.content, this.timestamp, this.sentBy, this.chatRoom);
    }
}
