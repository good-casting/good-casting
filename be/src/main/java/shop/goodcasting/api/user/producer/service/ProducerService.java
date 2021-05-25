package shop.goodcasting.api.user.producer.service;

import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;
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


    default ProducerDTO entity2Dto(Producer producer) {
        ProducerDTO producerDTO = ProducerDTO.builder()
                .producerId(producer.getProducerId())
                .agency(producer.getAgency())
                .email(producer.getEmail())
                .phone(producer.getPhone())
                .position(producer.getPosition())
                .build();
        return producerDTO;

    }
}
