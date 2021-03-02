package de.dhbwvs.student.chatservicebackend.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter @NoArgsConstructor
public class User {

    private @Id @GeneratedValue Long id;
    private String name;

    public User(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("User(%d, %s)", this.id, this.name);
    }
}
