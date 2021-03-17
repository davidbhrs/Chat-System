package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Mapper
public interface ChatRoomChatRoomDtoMapper {

    /**
     * Instance of the Mapper's implementation for clients to call its methods
     */
    ChatRoomChatRoomDtoMapper INSTANCE = Mappers.getMapper(ChatRoomChatRoomDtoMapper.class);

    /**
     * Abstract method mapping a ChatRoom object to a ChatRoomDto object
     *
     * @param chatRoom The ChatRoom object which shall be mapped
     * @return A ChatRoomDto object which is send via REST API
     */
    ChatRoomDto chatRoomToChatRoomDto(ChatRoom chatRoom);

}
