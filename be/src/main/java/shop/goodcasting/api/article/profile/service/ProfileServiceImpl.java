package shop.goodcasting.api.article.profile.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import shop.goodcasting.api.article.profile.domain.Profile;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.repository.ProfileRepository;

import java.util.ArrayList;
import java.util.List;
import shop.goodcasting.api.file.photo.domain.Photo;
import shop.goodcasting.api.file.photo.domain.PhotoDTO;
import shop.goodcasting.api.file.photo.repository.PhotoRepository;
import shop.goodcasting.api.user.actor.repository.ActorRepository;
import shop.goodcasting.api.user.login.repository.UserRepository;

import javax.transaction.Transactional;

@Lazy
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepo;
    private final PhotoRepository photoRepo;
    private final ActorRepository actorRepo;
    private final UserRepository userRepo;


    public List<ProfileDTO> searchPosts(String keyword) {
        List<Profile> profiles = profileRepo.findByTitleContaining(keyword);
        List<ProfileDTO> profileDTOList = new ArrayList<>();

        if (profiles.isEmpty()) return profileDTOList;

        for (Profile profile : profiles) {
            profileDTOList.add(this.convertEntityToDto(profile));
        }
        return profileDTOList;
    }
    private ProfileDTO convertEntityToDto(Profile profile) {
        return ProfileDTO.builder()
                .profileId(profile.getProfileId())
                .title(profile.getTitle())
                .contents(profile.getContents())
                .career(profile.getCareer())
                .privacy(profile.getPrivacy())
                .build();
    }
    @Transactional
    @Override
    public Long register(ProfileDTO profileDTO) {
        Profile profile = dto2Entity(profileDTO);
        System.out.println("service - register - profile: " + profile);
        userRepo.save(profile.getActor().getUserVO());

        actorRepo.save(profile.getActor());

        Profile finalProfile = profileRepo.save(profile);

        ArrayList<PhotoDTO> photos = profileDTO.getPhotos();

        if(photos != null && photos.size() > 0) {

            photos.forEach(photoDTO -> {
                photoDTO.setProfile(finalProfile);
                Photo photo = dto2EntityPhoto(photoDTO);

                photoRepo.save(photo);
            });
        }

        return null;
    }
}
