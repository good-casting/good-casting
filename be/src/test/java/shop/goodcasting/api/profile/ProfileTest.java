package shop.goodcasting.api.profile;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import shop.goodcasting.api.article.profile.domain.Profile;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.repository.ProfileRepository;
import shop.goodcasting.api.article.profile.service.ProfileService;
import shop.goodcasting.api.common.domain.PageRequestDTO;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.file.domain.FileVO;
import shop.goodcasting.api.file.repository.FileRepository;
import shop.goodcasting.api.file.service.FileService;
import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;
import shop.goodcasting.api.user.actor.repository.ActorRepository;
import shop.goodcasting.api.user.actor.service.ActorService;
import shop.goodcasting.api.user.login.domain.UserVO;
import shop.goodcasting.api.user.login.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SpringBootTest
public class ProfileTest {
    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ActorService actorService;

    @Autowired
    private FileService fileService;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ActorRepository actorRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    @Transactional
    public void testSearchPage() {
        PageRequestDTO pageRequest = PageRequestDTO.builder()
                .type("ra")
                .page(1)
                .size(10)
                .rkeyword("신봉선")
                .afrom(10)
                .ato(20)
                .build();

        Page<Object[]> result = profileRepository.searchPage(pageRequest, pageRequest.getPageable(Sort.by("confidence").descending()));

        result.forEach(p -> {
            System.out.println("TESTTESTTESTTEST profile" + Arrays.toString(p));
        });
    }

    @Test
    public void profilePage() {
//
//        PageResultDTO<ProfileDTO, Object[]> res = profileService.getProfileList(pageRequestDTO);
//
//        for (ProfileDTO profileDTO : res.getDtoList()) {
//            System.out.println(profileDTO);
//        }
    }

    @Test
    @Transactional
    public void deleteTests() {
        List<Long> res = fileRepository.selectFileIdsByProfileId(1L);

        res.forEach(num -> {
            System.out.println(num);
        });
    }

    @Test
    public void updateProfile() {

        List<Object[]> profileAndFile = profileRepository.getProfileAndFileByProfileId(1L);

//        FileDTO fileDto = new FileDTO();

        Profile profile = (Profile) profileAndFile.get(0)[0];

        System.out.println(profile);

        List<FileVO> fileList = new ArrayList<>();

        profileAndFile.forEach(objects -> {
            System.out.println(Arrays.toString(objects));
            FileVO file = (FileVO) objects[1];
            fileList.add(file);
        });

//        IntStream.rangeClosed(1,3).forEach(i -> {
//
//            FileVO fileVO = FileVO.builder()
//                    .fileName("test" + i +".jpg")
//                    .uuid(UUID.randomUUID().toString())
//                    .first(false)
//                    .build();
//
//            fileList.add(fileVO);
//        });

//        profileRepository.save(profile);
    }

    @Test
    public void getProfileAndFileAndActorByFirstTests() {
        Pageable pageable = PageRequest.of(0, 10);

        Page<Object[]> res = profileRepository.getProfileAndFileAndActorByFirst(pageable);

        System.out.println(res);

        res.get().forEach(objects -> {
            System.out.println("loop enter");
            Object[] arr = (Object[]) objects;

            System.out.println(Arrays.toString(arr));

        });

//        for (Object[] re : res) {
//            System.out.println("loop enter");
//            System.out.println(Arrays.toString(re));
//        }

        List<ProfileDTO> profileList = res.stream().map(objects -> {
            System.out.println("loop enter");
            System.out.println(Arrays.toString(objects));
            Profile profile = (Profile) objects[0];
            Actor actor = (Actor) objects[1];
            FileVO file = (FileVO) objects[2];

            ProfileDTO profileDTO = profileService.entity2Dto(profile);
            System.out.println("**********************" + profileDTO + "*****************************");
            ActorDTO actorDTO = actorService.entity2Dto(actor);
            System.out.println("**********************" + actorDTO + "*****************************");
            FileDTO fileDTO = fileService.entity2Dto(file);
            System.out.println("**********************" + fileDTO + "*****************************");

            List<FileDTO> files = new ArrayList<>();
            files.add(fileDTO);

            profileDTO.setActor(actorDTO);
            profileDTO.setFiles(files);

            System.out.println(profileDTO);

            return profileDTO;
        }).collect(Collectors.toList());

        for (ProfileDTO profileDTO : profileList) {
            System.out.println("----------------------------------------");
            System.out.println(profileDTO.getActor());
            System.out.println(profileDTO.getFiles());
        }
    }

    @Transactional
    @Commit
    @Test
    public void testInsert() {
        UserVO user = UserVO.builder().userId(1L).build();

        Actor actor = Actor.builder().user(user).actorId(1L).build();

        actorRepository.save(actor);

        Profile profile = Profile.builder()
                .actor(actor)
                .career("Career")
                .contents("content...")
                .build();

        profileRepository.save(profile);

        IntStream.rangeClosed(1,3).forEach(i -> {

            FileVO fileVO = FileVO.builder()
                    .fileName("test" + i +".jpg")
                    .uuid(UUID.randomUUID().toString())
                    .profile(profile)
                    .first(true)
                    .build();

            fileRepository.save(fileVO);
        });
    }

    @Test
    public void testRead() {

        List<Object[]> result = profileRepository.getProfileAndFileAndActorByProfileId(2L);

        System.out.println("_--------------------------------------------------");

        Profile p = (Profile) result.get(0)[0];
        System.out.println("-------------------" + p.getClass());
        Actor a = p.getActor();
        System.out.println("aaaaaaaaaaaaaaaaa: " + a);

        ProfileDTO profileDTO = profileService.entity2Dto(p);
        System.out.println("dtodtodtodotdotodtodto: " + profileDTO);

        ActorDTO actorDTO = actorService.entity2Dto(a);
        System.out.println("adto: " + actorDTO);

        ArrayList<FileDTO> fileList = new ArrayList<>();

        for (Object[] arr : result) {
            FileVO f = (FileVO) arr[2];

            System.out.println("file: " + arr[2]);
            System.out.println("---------------------------------");
            FileDTO fileDTO = fileService.entity2Dto(f);
            fileList.add(fileDTO);
        }

        for (FileDTO f : fileList) {
            System.out.println("fileLst: " + f);
        }

//        profileDTO.setActor(a);
        profileDTO.setFiles(fileList);
//        System.out.println("profile: " + p);
//        System.out.println("actor: " + a);
//
        System.out.println("profile dto: " + profileDTO);

    }

    @Test
    public void testUpdate() {
        Profile profile = profileRepository.findById(2L).get();

        System.out.println(profile);


    }

//    @Test
//    public void test() {
//        List<Object[]> res = profileRepository.getProfileWithFileByProfileId(2L);
//
//        for (Object[] arr : res) {
//            System.out.println(Arrays.toString(arr));
//        }
//    }
}
