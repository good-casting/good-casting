package shop.goodcasting.api.article.hire.service;

import shop.goodcasting.api.article.hire.domain.Hire;
import shop.goodcasting.api.article.hire.domain.HireDTO;
import shop.goodcasting.api.user.producer.domain.Producer;
import shop.goodcasting.api.user.producer.domain.ProducerDTO;

public interface HireService {
    Long register(HireDTO hireDTO);
    HireDTO readHire(Long hireId);

    default Hire dto2Entity(HireDTO hireDTO) {
        return Hire.builder()
                .hireId(hireDTO.getHireId())
                .title(hireDTO.getTitle())
                .contents(hireDTO.getContents())
                .cast(hireDTO.getCast())
                .filming(hireDTO.getFilming())
                .deadline(hireDTO.getDeadline())
                .personnel(hireDTO.getPersonnel())
                .build();
    }
    default Hire dto2EntityAll(HireDTO hireDTO){
        return Hire.builder()
                .hireId(hireDTO.getHireId())
                .title(hireDTO.getTitle())
                .contents(hireDTO.getContents())
                .cast(hireDTO.getCast())
                .filming(hireDTO.getFilming())
                .deadline(hireDTO.getDeadline())
                .personnel(hireDTO.getPersonnel())
                .producer(Producer.builder().producerId(hireDTO.getProducer().getProducerId()).build())
                .build();
    }
    default HireDTO entity2Dto(Hire hire) {
        return HireDTO.builder()
                .hireId(hire.getHireId())
                .title(hire.getTitle())
                .contents(hire.getContents())
                .cast(hire.getCast())
                .filming(hire.getFilming())
                .deadline(hire.getDeadline())
                .personnel(hire.getPersonnel())
                .build();
    }
    default HireDTO entity2DtoAll(Hire hire) {
        return HireDTO.builder()
                .hireId(hire.getHireId())
                .title(hire.getTitle())
                .contents(hire.getContents())
                .cast(hire.getCast())
                .filming(hire.getFilming())
                .deadline(hire.getDeadline())
                .personnel(hire.getPersonnel())
                .producer(ProducerDTO.builder()
                        .producerId(hire.getProducer().getProducerId())
                        .build())
                .build();
    }
}
