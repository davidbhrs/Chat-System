package de.dhbwvs.student.chatservicebackend.config;

import de.dhbwvs.student.chatservicebackend.models.ChatRoom;
import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import de.dhbwvs.student.chatservicebackend.models.User;
import de.dhbwvs.student.chatservicebackend.repositories.ChatRoomRepository;
import de.dhbwvs.student.chatservicebackend.repositories.TextMessageRepository;
import de.dhbwvs.student.chatservicebackend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author      Julian Gommlich <carljulian.gommlich@student.dhbw-vs.de>
 * @version     1.0
 * @since       1.0
 */
@Configuration
public class LoadDatabase {

    /**
     * A Logger that is supposed to log events concerning interactions with the database
     */
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    /**
     * Database initialisation
     *
     * @param userRepository The repository which is needed to save the user data in the database
     * @return The CommandLineRunner which persists the data inside the database
     */
    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository
    ) {

        return args -> {
            log.info("Preloading " + userRepository.save(new User("James T. Kirk")));
            log.info("Preloading " + userRepository.save(new User("Spock")));
            log.info("Preloading " + userRepository.save(new User("Jean-Luc Picard")));
            log.info("Preloading " + userRepository.save(new User("Leonard McCoy")));
            log.info("Preloading " + userRepository.save(new User("Scotty")));
            log.info("Preloading " + userRepository.save(new User("Uhura")));
            log.info("Preloading " + userRepository.save(new User("Hikaru Sulu")));
        };
    }
}
