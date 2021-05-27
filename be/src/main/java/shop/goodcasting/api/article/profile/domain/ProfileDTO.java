package shop.goodcasting.api.article.profile.domain;

import lombok.*;
import org.springframework.stereotype.Component;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;
import java.util.List;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class ProfileDTO {
    // pk
    private Long profileId;

    private boolean privacy;
    private String contents;
    private String career;
    private String resemble;
    private Double confidence;
    private Timestamp regDate;
    private Timestamp modDate;
    private String actorName;

    private ActorDTO actor;

    private List<FileDTO> files;
}