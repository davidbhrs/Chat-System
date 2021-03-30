package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.ChatRoomDto;
import de.dhbwvs.student.chatservicebackend.models.payrole.TextMessageDto;
import de.dhbwvs.student.chatservicebackend.models.payrole.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Date;

public class TextMessageTextMessageDtoMapperTest {

    @Test
    void testMappingTextMessageToTextMessageDto() {
        // Arrange
        Long id = 42L;
        String content = "Test Inhalt";
        ChatRoom chatRoom = new ChatRoom();
        Date timestamp = new Date();
        User user = new User("Testname");

        TextMessage textMessage = new TextMessage();
        textMessage.setId(id);
        textMessage.setContent(content);
        textMessage.setChatRoom(chatRoom);
        textMessage.setTimestamp(timestamp);
        textMessage.setSentBy(user);

        // Act
        TextMessageDto textMessageDto = TextMessageTextMessageDtoMapper.INSTANCE.textMessageToTextMessageDto(textMessage);

        // Assert
        Assertions.assertNotNull(textMessageDto);
        Assertions.assertEquals(textMessage.getId(), textMessageDto.getId());
        Assertions.assertEquals(textMessage.getContent(), textMessageDto.getContent());
        Assertions.assertTrue(textMessageDto.getChatRoom() instanceof ChatRoomDto);
        Assertions.assertEquals(textMessage.getTimestamp(), textMessageDto.getTimestamp());
        Assertions.assertTrue(textMessageDto.getSentBy() instanceof UserDto);
        Assertions.assertEquals(textMessage.getSentBy().getName(), textMessageDto.getSentBy().getName());
    }
}
