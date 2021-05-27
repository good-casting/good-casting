package shop.goodcasting.api.file;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.file.repository.FileRepository;
import shop.goodcasting.api.file.service.FileService;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

public class FileTest {
    @Autowired
    private FileRepository fileRepo;

    @Test
    public void fileDeleteTests() {
        File deleteFile = new File("C:/Users/aa/Desktop/test2/에일리 노래.mp4");

        if(deleteFile.exists()) {
            deleteFile.delete();
//            fileRepo.deleteById(fileId);
            System.out.println("파일을 삭제하였습니다.");
        } else {
            System.out.println("파일이 존재하지 않습니다.");
        }
    }

}
