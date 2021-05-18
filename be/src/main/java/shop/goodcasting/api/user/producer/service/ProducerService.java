package shop.goodcasting.api.user.producer.service;

import shop.goodcasting.api.user.producer.domain.Producer;
import shop.goodcasting.api.user.producer.domain.ProducerDTO;

public interface ProducerService {
    default Producer dtoToEntity(ProducerDTO dto) {
        Producer entity = Producer.builder()
                .email(dto.getEmail())
                .agency(dto.getAgency())
                .phone(dto.getPhone())
                .position(dto.getPosition())
                .build();
        return entity;
    }

}
