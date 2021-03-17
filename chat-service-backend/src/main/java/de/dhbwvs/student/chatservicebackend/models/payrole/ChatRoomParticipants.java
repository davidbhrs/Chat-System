package de.dhbwvs.student.chatservicebackend.models.payrole;

import de.dhbwvs.student.chatservicebackend.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class ChatRoomParticipants {

    private User participantOne;
    private User participantTwo;

}
