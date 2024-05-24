package com.gdin.gdin.services;

import com.gdin.gdin.entities.FileData;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.repositories.FileDataRepository;
import com.gdin.gdin.repositories.SpotRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StorageService {

    private final FileDataRepository fileDataRepository;
//    private final String FOLDER_PATH="/resources/";

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
//        String filePath=FOLDER_PATH+file.getOriginalFilename();
        String currentDir = System.getProperty("user.dir");
        String folderPath = currentDir + "/src/main/resources/";
        String filePath = folderPath + file.getOriginalFilename();

        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return filePath;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath=fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }
}