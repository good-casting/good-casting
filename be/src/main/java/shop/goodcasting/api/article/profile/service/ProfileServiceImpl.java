package shop.goodcasting.api.article.profile.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import shop.goodcasting.api.article.profile.domain.Profile;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.repository.ProfileRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository repo;

    public List<ProfileDTO> searchPosts(String keyword) {
        List<Profile> profiles = repo.findByTitleContaining(keyword);
        List<ProfileDTO> profileDTOList = new ArrayList<>();

        if (profiles.isEmpty()) return profileDTOList;

        for (Profile profile : profiles) {
            profileDTOList.add(this.convertEntityToDto(profile));
        }
        return profileDTOList;
    }
    private ProfileDTO convertEntityToDto(Profile profile){
        return ProfileDTO.builder()
                .profileId(profile.getProfileId())
                .title(profile.getTitle())
                .contents(profile.getContents())
                .career(profile.getCareer())
                .privacy(profile.getPrivacy())
                .build();
    }
}
