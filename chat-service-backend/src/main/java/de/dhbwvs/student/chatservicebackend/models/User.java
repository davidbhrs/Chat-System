package de.dhbwvs.student.chatservicebackend.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Entity
@Getter @Setter @NoArgsConstructor
public class User {

    /**
     * Entities Attributes
     */
    private @Id @GeneratedValue(strategy= GenerationType.IDENTITY) Long id;
    private String name;

    /**
     * Constructor
     *
     * @param name Name of the new User
     */
    public User(String name) {
        this.name = name;
    }

    /**
     * String-Formatter for class User
     *
     * @return A String formatted like this: "User(id, name)"
     */
    @Override
    public String toString() {
        return String.format("User(%d, %s)", this.id, this.name);
    }
}
