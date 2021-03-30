package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class UserUserDtoMapperTest {

    @Test
    void testMappingUserToUserDto() {
        // Arrange
        Long id = 42L;
        String name = "Test Name";

        User user = new User();
        user.setId(id);
        user.setName(name);

        // Act
        UserDto userDto = UserUserDtoMapper.INSTANCE.userToUserDto(user);

        // Assert
        Assertions.assertNotNull(userDto);
        Assertions.assertEquals(user.getId(), userDto.getId());
        Assertions.assertEquals(user.getName(), userDto.getName());
    }
}
