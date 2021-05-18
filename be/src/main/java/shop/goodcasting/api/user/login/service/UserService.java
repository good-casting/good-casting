package shop.goodcasting.api.user.login.service;

import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;
import shop.goodcasting.api.user.login.domain.UserDTO;
import shop.goodcasting.api.user.login.domain.UserVO;

import java.util.List;

public interface UserService {
    String signup(UserDTO userDTO);

    UserDTO signin(UserDTO userDTO);

    List<UserVO> findAll();

    default UserVO dto2EntityUserVO(UserDTO userDTO) {
        return UserVO.builder()
                .userId(userDTO.getUserId())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .build();

    }

    default UserDTO entity2DtoUserDTO(UserVO userVO) {
        return UserDTO.builder()
                .userId(userVO.getUserId())
                .username(userVO.getUsername())
                .password(userVO.getPassword())
                .build();
    }
}
