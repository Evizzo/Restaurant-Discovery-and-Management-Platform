package com.gdin.gdin.services;

import com.gdin.gdin.entities.FileData;
import com.gdin.gdin.repositories.FileDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;
import org.apache.commons.io.FilenameUtils;

@Service
@AllArgsConstructor
public class StorageService {

    private final FileDataRepository fileDataRepository;

    public FileData uploadImageToFileSystem(MultipartFile file, String spotName, String spotAddress, String spotPhone) throws IOException {
        String currentDir = System.getProperty("user.dir");
        String baseFolderPath = currentDir + "/../frontend/src/assets/";

        String sanitizedAddress = spotAddress.replaceAll("[^a-zA-Z0-9]", "_");
        String sanitizedPhone = spotPhone.replaceAll("[^a-zA-Z0-9]", "_");
        String sanitizedName = spotName.replaceAll("[^a-zA-Z0-9]", "_");

        String folderPath = baseFolderPath + sanitizedName + "_" + sanitizedAddress + "_" + sanitizedPhone;

        File spotDirectory = new File(folderPath);
        if (!spotDirectory.exists()) {
            spotDirectory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(originalFilename);
        if (!fileExtension.matches("^(?i)(jpg|jpeg|png|gif|bmp)$")) {
            throw new IllegalArgumentException("Invalid file format. Only image files (jpg, jpeg, png, gif, bmp) are allowed.");
        }

        String filePath = folderPath + "/" + file.getOriginalFilename();

        String filePathToDisplay = "../src/assets/" + sanitizedName + "_" + sanitizedAddress + "_" + sanitizedPhone + "/" + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePathToDisplay).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return fileData;
        }
        return null;
    }

    public FileData uploadMenuImageToFileSystem(MultipartFile file, String spotName, String spotAddress, String spotPhone) throws IOException {
        String currentDir = System.getProperty("user.dir");
        String baseFolderPath = currentDir + "/../frontend/src/assets/";

        String sanitizedAddress = spotAddress.replaceAll("[^a-zA-Z0-9]", "_");
        String sanitizedPhone = spotPhone.replaceAll("[^a-zA-Z0-9]", "_");
        String sanitizedName = spotName.replaceAll("[^a-zA-Z0-9]", "_");

        String folderPath = baseFolderPath + "MENU_" + sanitizedName + "_" + sanitizedAddress + "_" + sanitizedPhone;

        File spotDirectory = new File(folderPath);
        if (!spotDirectory.exists()) {
            spotDirectory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(originalFilename);
        if (!fileExtension.matches("^(?i)(jpg|jpeg|png|gif|bmp)$")) {
            throw new IllegalArgumentException("Invalid file format. Only image files (jpg, jpeg, png, gif, bmp) are allowed.");
        }

        String filePath = folderPath + "/" + file.getOriginalFilename();

        String filePathToDisplay = "../src/assets/" + "MENU_" + sanitizedName + "_" + sanitizedAddress + "_" + sanitizedPhone + "/" + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePathToDisplay).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return fileData;
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