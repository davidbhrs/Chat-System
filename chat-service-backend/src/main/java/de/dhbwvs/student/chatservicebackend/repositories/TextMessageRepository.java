package de.dhbwvs.student.chatservicebackend.repositories;

import de.dhbwvs.student.chatservicebackend.models.TextMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TextMessageRepository extends JpaRepository<TextMessage, Long> {
}
