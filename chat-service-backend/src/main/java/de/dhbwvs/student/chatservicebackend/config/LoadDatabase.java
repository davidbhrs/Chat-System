package de.dhbwvs.student.chatservicebackend.config;

import de.dhbwvs.student.chatservicebackend.models.User;
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
     * @param userRepository The repository which is needed to save the data in the database
     * @return The CommandLineRunner which persists the data inside the database
     */
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {

        return args -> {
            log.info("Preloading " + userRepository.save(new User("Frodo Baggins")));
            log.info("Preloading " + userRepository.save(new User("Marty McFly")));
            log.info("Preloading " + userRepository.save(new User("Arthur Dent")));
            log.info("Preloading " + userRepository.save(new User("Zaphod Beeblebrox")));
            log.info("Preloading " + userRepository.save(new User("Captain James T. Kirk")));
            log.info("Preloading " + userRepository.save(new User("Mr. Spock")));
            log.info("Preloading " + userRepository.save(new User("Qui-Gon Jinn")));
            log.info("Preloading " + userRepository.save(new User("Obi-Wan Kenobi")));
            log.info("Preloading " + userRepository.save(new User("Der sprechende Hut")));
        };
    }

}
