package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import de.dhbwvs.student.chatservicebackend.models.payrole.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class ChatRoomChatRoomDtoMapperTest {

    @Test
    void testMappingChatRoomToChatRoomDto() {
        // Arrange
        Long id = 42L;
        User participantOne = new User("Teilnehmer 1");
        User participantTwo = new User("Teilnehmer 2");

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setId(id);
        chatRoom.setParticipantOne(participantOne);
        chatRoom.setParticipantTwo(participantTwo);

        // Act
        ChatRoomDto chatRoomDto = ChatRoomChatRoomDtoMapper.INSTANCE.chatRoomToChatRoomDto(chatRoom);

        // Assert
        Assertions.assertNotNull(chatRoomDto);
        Assertions.assertEquals(chatRoom.getId(), chatRoomDto.getId());
        Assertions.assertTrue(chatRoomDto.getParticipantOne() instanceof UserDto);
        Assertions.assertEquals(chatRoom.getParticipantOne().getName(), chatRoomDto.getParticipantOne().getName());
        Assertions.assertTrue(chatRoomDto.getParticipantTwo() instanceof UserDto);
        Assertions.assertEquals(chatRoom.getParticipantTwo().getName(), chatRoomDto.getParticipantTwo().getName());
    }
}
