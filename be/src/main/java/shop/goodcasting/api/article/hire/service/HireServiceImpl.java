package shop.goodcasting.api.article.hire.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.goodcasting.api.article.hire.domain.Hire;
import shop.goodcasting.api.article.hire.domain.HireDTO;
import shop.goodcasting.api.article.hire.repository.HireRepository;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.article.profile.service.ProfileServiceImpl;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.file.domain.FileVO;
import shop.goodcasting.api.file.repository.FileRepository;
import shop.goodcasting.api.file.service.FileService;
import shop.goodcasting.api.user.producer.domain.Producer;
import shop.goodcasting.api.user.producer.domain.ProducerDTO;
import shop.goodcasting.api.user.producer.service.ProducerService;

import java.util.ArrayList;
import java.util.List;

@Lazy
@Service
@RequiredArgsConstructor
public class HireServiceImpl implements HireService {
    private final HireRepository hireRepo;
    private final FileService fileService;
    private final ProducerService producerService;
    private final FileRepository fileRepo;
    private final ProfileServiceImpl profileService;

    @Transactional
    @Override
    public Long register(HireDTO hireDTO) {
    HireDTO finalHireDto = entity2DtoAll(hireRepo.save(dto2EntityAll(hireDTO)));

    List<FileDTO> files = hireDTO.getFiles();

        return saveFile(finalHireDto, files);
    }

    @Transactional
    @Override
    public HireDTO readHire(Long hireId) {
        System.out.println("getHireWithFileByHireId() entry");

        List<Object[]> hireAndFileAndProducer = hireRepo.getHireAndFileAndProducerByHireId(hireId);
        Hire hire = (Hire) hireAndFileAndProducer.get(0)[0];
        Producer producer = hire.getProducer();

        HireDTO hireDTO = entity2Dto(hire);

        ProducerDTO producerDTO = producerService.entity2Dto(producer);

        List<FileDTO> fileList = new ArrayList<>();

        hireAndFileAndProducer.forEach(objects -> {
            fileList.add(fileService.entity2Dto((FileVO)objects[2]));
        });
        hireDTO.setProducer(producerDTO);
        hireDTO.setFiles(fileList);
        return hireDTO;
    }

    @Transactional
    public Long update(HireDTO hireDTO) {
        Long hireId = hireDTO.getHireId();

        hireRepo.save(dto2EntityAll(hireDTO));

        fileRepo.deleteByHireId(hireId);

        List<FileDTO> files = hireDTO.getFiles();

        return saveFile(hireDTO, files);
    }

    @Transactional
    public void deleteHire(Long hireId){
        fileRepo.deleteByProfileId(hireId);

        hireRepo.deleteById(hireId);
    }

    public Long saveFile(HireDTO hireDTO, List<FileDTO> files) {
        if(files != null && files.size() > 0) {
            files.forEach(fileDTO -> {
                fileDTO.setHire(hireDTO);
                FileVO file = fileService.dto2EntityAll(fileDTO);
                fileRepo.save(file);

                if (file.isPhotoType() && fileDTO.isFirst()) {
                    profileService.extractCelebrity(file.getFileName(), hireDTO.getHireId(), hireDTO.getHireId());
                }
            });
            return 1L;
        }
        return 0L;
    }
}
