package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.payrole.TextMessageDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-03-27T15:12:00+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 15.0.2 (Oracle Corporation)"
)
public class TextMessageTextMessageDtoMapperImpl implements TextMessageTextMessageDtoMapper {

    @Override
    public TextMessageDto textMessageToTextMessageDto(TextMessage textMessage) {
        if ( textMessage == null ) {
            return null;
        }

        TextMessageDto textMessageDto = new TextMessageDto();

        textMessageDto.setId( textMessage.getId() );
        textMessageDto.setContent( textMessage.getContent() );
        textMessageDto.setTimestamp( textMessage.getTimestamp() );

        textMessageDto.setSentBy( UserUserDtoMapper.INSTANCE.userToUserDto(textMessage.getSentBy()) );
        textMessageDto.setChatRoom( ChatRoomChatRoomDtoMapper.INSTANCE.chatRoomToChatRoomDto(textMessage.getChatRoom()) );

        return textMessageDto;
    }
}
