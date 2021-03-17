package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-03-17T10:50:02+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 15.0.2 (Oracle Corporation)"
)
public class ChatRoomChatRoomDtoMapperImpl implements ChatRoomChatRoomDtoMapper {

    @Override
    public ChatRoomDto chatRoomToChatRoomDto(ChatRoom chatRoom) {
        if ( chatRoom == null ) {
            return null;
        }

        ChatRoomDto chatRoomDto = new ChatRoomDto();

        chatRoomDto.setId( chatRoom.getId() );
        chatRoomDto.setParticipantOne( chatRoom.getParticipantOne() );
        chatRoomDto.setParticipantTwo( chatRoom.getParticipantTwo() );

        return chatRoomDto;
    }
}
