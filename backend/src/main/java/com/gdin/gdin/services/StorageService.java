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

    public FileData uploadImageToFileSystem(MultipartFile file, String spotId) throws IOException {
        String currentDir = System.getProperty("user.dir");
        String baseFolderPath = currentDir + "/../frontend/src/assets/";

        String folderPath = baseFolderPath + spotId;

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

        String filePathToDisplay = "../src/assets/" + spotId + "/" + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePathToDisplay)
                .absoluteFilePath(filePath)
                .build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return fileData;
        }
        return null;
    }

    public FileData uploadMenuImageToFileSystem(MultipartFile file, String spotId) throws IOException {
        String currentDir = System.getProperty("user.dir");
        String baseFolderPath = currentDir + "/../frontend/src/assets/";

        String folderPath = baseFolderPath + "MENU_" + spotId;

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

        String filePathToDisplay = "../src/assets/" + "MENU_" + spotId + "/" + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(FileData.builder()
                .name("menu_" + file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePathToDisplay)
                .absoluteFilePath(filePath)
                .build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return fileData;
        }
        return null;
    }

    public void deleteImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileDataOptional = fileDataRepository.findByName(fileName);

        if (fileDataOptional.isPresent()) {
            FileData fileData = fileDataOptional.get();
            String filePath = fileData.getAbsoluteFilePath();

            File file = new File(filePath);
            if (file.exists()) {
                if (file.delete()) {
                    File directory = file.getParentFile();
                    if (directory.isDirectory() && directory.list().length == 0) {
                        if (!directory.delete()) {
                            throw new IOException("Failed to delete the directory");
                        }
                    }
                    fileDataRepository.delete(fileData);
                    System.out.println("DELETING " + filePath);
                } else {
                    throw new IOException("Failed to delete the file");
                }
            } else {
                throw new IOException("File not found in the file system " + file.getAbsoluteFile());
            }
        } else {
            throw new IOException("File data not found in the repository " + fileName);
        }
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath=fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }
}