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
     * @param chatRoomRepository The repository which is needed to save the chat room data in the database
     * @param textMessageRepository The repository which is needed to save the text message data in the database
     * @return The CommandLineRunner which persists the data inside the database
     */
    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            ChatRoomRepository chatRoomRepository,
            TextMessageRepository textMessageRepository
    ) {

        return args -> {
            User user1 = new User("Frodo Baggins");
            User user2 = new User("Marty McFly");
            log.info("Preloading " + userRepository.save(user1));
            log.info("Preloading " + userRepository.save(user2));
            log.info("Preloading " + userRepository.save(new User("Arthur Dent")));
            log.info("Preloading " + userRepository.save(new User("Zaphod Beeblebrox")));
            log.info("Preloading " + userRepository.save(new User("Captain James T. Kirk")));
            log.info("Preloading " + userRepository.save(new User("Mr. Spock")));
            log.info("Preloading " + userRepository.save(new User("Qui-Gon Jinn")));
            log.info("Preloading " + userRepository.save(new User("Obi-Wan Kenobi")));
            log.info("Preloading " + userRepository.save(new User("Der sprechende Hut")));

            //ChatRoom chatRoom1 = new ChatRoom(user1, user2);
            //log.info("Preloading " + chatRoomRepository.save(chatRoom1));

            //log.info("Preloading " + textMessageRepository.save(new TextMessage("Hello World!", user1, chatRoom1)));
        };
    }
}
