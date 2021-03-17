package de.dhbwvs.student.chatservicebackend.models.payrole;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter @Setter @NoArgsConstructor
public class UserPayRole {

    /**
     * Entity's Attributes
     */
    private @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) Long id;
    private String name;

}
