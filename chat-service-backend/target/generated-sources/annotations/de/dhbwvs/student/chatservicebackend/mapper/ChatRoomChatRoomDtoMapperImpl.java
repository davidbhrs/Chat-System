package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-03-27T00:08:47+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.10 (Ubuntu)"
)
public class ChatRoomChatRoomDtoMapperImpl implements ChatRoomChatRoomDtoMapper {

    @Override
    public ChatRoomDto chatRoomToChatRoomDto(ChatRoom chatRoom) {
        if ( chatRoom == null ) {
            return null;
        }

        ChatRoomDto chatRoomDto = new ChatRoomDto();

        chatRoomDto.setId( chatRoom.getId() );

        chatRoomDto.setParticipantOne( UserUserDtoMapper.INSTANCE.userToUserDto(chatRoom.getParticipantOne()) );
        chatRoomDto.setParticipantTwo( UserUserDtoMapper.INSTANCE.userToUserDto(chatRoom.getParticipantTwo()) );

        return chatRoomDto;
    }
}
