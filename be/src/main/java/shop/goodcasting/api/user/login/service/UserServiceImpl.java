package shop.goodcasting.api.user.login.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop.goodcasting.api.security.domain.SecurityProvider;
import shop.goodcasting.api.security.exception.SecurityRuntimeException;
import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.repository.ActorRepository;
import shop.goodcasting.api.user.login.domain.Role;
import shop.goodcasting.api.user.login.domain.UserDTO;
import shop.goodcasting.api.user.login.domain.UserVO;
import shop.goodcasting.api.user.login.repository.UserRepository;
import shop.goodcasting.api.user.producer.domain.Producer;
import shop.goodcasting.api.user.producer.repository.ProducerRepository;

import java.util.ArrayList;
import java.util.List;

@Log
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final ActorRepository actorRepo;
    private final ProducerRepository producerRepo;
    private final PasswordEncoder passwordEncoder;
    private final SecurityProvider provider;

    @Override
    public String signup(UserDTO userDTO) {

        if(!userRepo.existsByUsername(userDTO.getUsername())){
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            List<Role> actorList = new ArrayList<>();
            List<Role> producerList = new ArrayList<>();
            Boolean position = userDTO.getPosition();
            Actor actor = new Actor();
            Producer producer = new Producer();

            if(position){
                actorList.add(Role.USER);
                userDTO.setRoles(actorList);

                UserVO userVO = dto2EntityUserVO(userDTO);

                userRepo.save(userVO);
                actor.changeUserVO(userVO);
                actorRepo.save(actor);
                log.info("-------actor--------" + actor.getAgency());
            } else {
                producerList.add(Role.USER);
                userDTO.setRoles(producerList);

                UserVO userVO = dto2EntityUserVO(userDTO);

                userRepo.save(userVO);
                producer.changeUserVO(userVO);
                producerRepo.save(producer);
            }
            return provider.createToken(userDTO.getUsername(), userDTO.getRoles());
        }else{
            throw new SecurityRuntimeException("중복된 username", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    @Override
    public UserDTO signin(UserDTO userDTO) {
        try{
            String token = (passwordEncoder.matches(userDTO.getPassword(), userRepo.findByUsername(userDTO.getUsername()).get().getPassword()))
                    ?provider.createToken(userDTO.getUsername(), userRepo.findByUsername(userDTO.getUsername()).get().getRoles())
                    : "Wrong password";

            UserVO userVO = dto2EntityUserVO(userDTO);
            userDTO.setToken(token);

            return userDTO;

        }catch(Exception e){
            throw new SecurityRuntimeException("유효하지 않은 아이디 / 비밀번호", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    public List<UserVO> findAll() {
        return userRepo.findAll();
    }
}













