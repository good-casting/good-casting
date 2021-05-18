package shop.goodcasting.api.article.profile.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.service.ProfileServiceImpl;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    private final ProfileServiceImpl service;

    @GetMapping("/search")
    public List<ProfileDTO> search(@RequestParam(value = "keyword") String keyword) {
        return service.searchPosts(keyword);

        }
    @PostMapping("/register")
    public ResponseEntity<Long> register(@RequestBody ProfileDTO profileDTO) {
        System.out.println("Profile DTO: " + profileDTO);
        System.out.println("Profile DTO actor name: " + profileDTO.getActor());
        System.out.println("Profile DTO user username: " + profileDTO.getActor().getUserVO());

        service.register(profileDTO);

        return ResponseEntity.ok(1L);
    }

}

