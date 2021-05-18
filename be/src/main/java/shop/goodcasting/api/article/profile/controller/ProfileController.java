package shop.goodcasting.api.article.profile.controller;

import io.swagger.models.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.service.ProfileServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {
    private final ProfileServiceImpl service;

   @GetMapping("/search")
   public List<ProfileDTO> search(@RequestParam(value = "keyword") String keyword){
        return service.searchPosts(keyword);
    }
}
