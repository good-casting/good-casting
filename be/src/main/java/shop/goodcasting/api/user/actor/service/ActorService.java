package shop.goodcasting.api.user.actor.service;

import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;

import java.util.List;
import java.util.Optional;

public interface ActorService {

    List<Actor> findAll();

    Optional<Actor> findById(Long actorId);

    Long delete(Actor actor);

    default Actor dtoToEntity(ActorDTO dto) {
        Actor entity = Actor.builder()
                .birthday(dto.getBirthday())
                .gender(dto.getGender())
                .phone(dto.getPhone())
                .height(dto.getHeight())
                .weight(dto.getWeight())
                .agency(dto.getAgency())
                .major(dto.getMajor())
                .build();
        return entity;
    }

}