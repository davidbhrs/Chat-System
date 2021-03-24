package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import de.dhbwvs.student.chatservicebackend.models.payrole.TextMessageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Mapper
public interface TextMessageTextMessageDtoMapper {

    /**
     * Instance of the Mapper's implementation for clients to call its methods
     */
    TextMessageTextMessageDtoMapper INSTANCE = Mappers.getMapper(TextMessageTextMessageDtoMapper.class);

    /**
     * Abstract method mapping a TextMessage object to a TextMessageDto object
     *
     * @param textMessage The TextMessage object which shall be mapped
     * @return A TextMessageDto object which is send via REST API
     */
    @Mapping(target = "sentBy", expression = "java(UserUserDtoMapper.INSTANCE.userToUserDto(textMessage.getSentBy()))")
    @Mapping(target = "chatRoom", expression = "java(ChatRoomChatRoomDtoMapper.INSTANCE.chatRoomToChatRoomDto(textMessage.getChatRoom()))")
    TextMessageDto textMessageToTextMessageDto(TextMessage textMessage);
}
