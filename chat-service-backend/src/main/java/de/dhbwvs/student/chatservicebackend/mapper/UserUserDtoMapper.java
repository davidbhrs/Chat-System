package de.dhbwvs.student.chatservicebackend.mapper;

import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.models.payrole.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Mapper
public interface UserUserDtoMapper {

    /**
     * Instance of the Mapper's implementation for clients to call its methods
     */
    UserUserDtoMapper INSTANCE = Mappers.getMapper(UserUserDtoMapper.class);

    /**
     * Abstract method mapping a User object to a UserDto object
     *
     * @param user The User object which shall be mapped
     * @return A UserDto object which is send via REST API
     */
    UserDto userToUserPayRole(User user);
}
