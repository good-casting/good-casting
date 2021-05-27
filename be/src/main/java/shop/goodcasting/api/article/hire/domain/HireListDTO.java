package shop.goodcasting.api.article.hire.domain;

import lombok.*;
import org.springframework.stereotype.Component;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.user.producer.domain.ProducerDTO;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class HireListDTO {
    private Long hireId;

    private String project;
    private String cast;
    private LocalDateTime deadline;
    private Timestamp regDate;
    private Timestamp modDate;

    private String producerAgency;

    private String fileName;
    private String fileUuid;
}
