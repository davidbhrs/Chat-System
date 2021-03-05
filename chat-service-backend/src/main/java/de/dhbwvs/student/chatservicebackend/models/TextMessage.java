package de.dhbwvs.student.chatservicebackend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
public class TextMessage {

    private @Id @GeneratedValue Long id;
    private String content;
    private Date timestamp;

    @OneToOne(cascade = CascadeType.REMOVE)
    private ChatRoom chatRoom;
}
