package shop.goodcasting.api.file.service;

import shop.goodcasting.api.article.profile.domain.Profile;
import shop.goodcasting.api.article.profile.domain.ProfileDTO;
import shop.goodcasting.api.file.domain.FileDTO;
import shop.goodcasting.api.file.domain.FileVO;

import java.io.File;
import java.util.List;

public interface FileService {
    void extractVideoThumbnail(File file) throws Exception;

//    List<FileDTO> findFileListByProfileId(Long profileId);

    default FileDTO entity2Dto(FileVO fileVO) {
        return FileDTO.builder()
                .fileId(fileVO.getFileId())
                .fileName(fileVO.getFileName())
                .uuid(fileVO.getUuid())
                .first(fileVO.isFirst())
                .photoFile(fileVO.isPhotoFile())
                .build();
    }

    default FileDTO entity2DtoAll(FileVO fileVO) {
        return FileDTO.builder()
                .fileId(fileVO.getFileId())
                .fileName(fileVO.getFileName())
                .uuid(fileVO.getUuid())
                .first(fileVO.isFirst())
                .photoFile(fileVO.isPhotoFile())
                .profile(ProfileDTO.builder()
                        .profileId(fileVO.getProfile().getProfileId())
                        .build())
                .build();
    }

    default FileVO dto2Entity(FileDTO fileDTO) {
        return FileVO.builder()
                .fileId(fileDTO.getFileId())
                .fileName(fileDTO.getFileName())
                .uuid(fileDTO.getUuid())
                .first(fileDTO.isFirst())
                .photoFile(fileDTO.isPhotoFile())
                .build();
    }

    default FileVO dto2EntityAll(FileDTO fileDTO) {
        return FileVO.builder()
                .fileId(fileDTO.getFileId())
                .fileName(fileDTO.getFileName())
                .uuid(fileDTO.getUuid())
                .first(fileDTO.isFirst())
                .photoFile(fileDTO.isPhotoFile())
                .profile(Profile.builder()
                        .profileId(fileDTO.getProfile().getProfileId())
                        .build())
                .build();
    }
}