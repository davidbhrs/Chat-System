package de.dhbwvs.student.chatservicebackend.config;

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
     * Database initialisation
     *
     * @return The CommandLineRunner which persists the data inside the database
     */
    @Bean
    CommandLineRunner initDatabase() {
        return args -> {};
    }
}
