package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Abstract method to find a User in the database by their username
     * <p>
     * The method is implemented automatically by the JpaRepository
     * <p>
     * The JpaRepository can tell how this method needs to be implemented, because the name of the method follows a
     * naming convention which enables the JpaRepository to form the correct database query
     *
     * @param name The username of the User which shall be found
     * @return An Optional which either contains a User-Object or is empty
     */
    Optional<User> findByName(String name);

}
