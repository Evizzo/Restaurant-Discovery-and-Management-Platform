package com.gdin.gdin.services;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.FileData;
import com.gdin.gdin.entities.Review;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.enums.Role;
import com.gdin.gdin.repositories.ReviewRepository;
import com.gdin.gdin.repositories.SpotRepository;
import com.gdin.gdin.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AdminService {
    private final SpotRepository spotRepository;
    private final SpotService spotService;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final ReviewRepository reviewRepository;

    public SpotDto approveSpot(UUID spotId) {
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);

        if (optionalSpot.isEmpty()) {
            return null;
        }

        Spot spot = optionalSpot.get();

        spot.setApproved(true);

        spot.getOwner().setRole(Role.SPOT_OWNER);

        Spot approvedSpot = spotRepository.save(spot);

        userRepository.save(spot.getOwner());

        return spotService.convertToDto(approvedSpot);
    }

    public List<SpotDto> retrieveUnapprovedSpots(){
        return spotRepository.findAll()
                .stream()
                .filter(spot -> !spot.getApproved())
                .map(spotService::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SpotDto> retrieveAllSpots(){
        return spotRepository.findAll()
                .stream()
                .map(spotService::convertToDto)
                .collect(Collectors.toList());
    }

    public void deleteSpot(UUID spotId) throws IOException, ChangeSetPersister.NotFoundException {
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);
        if (optionalSpot.isPresent()) {
            Spot spot = optionalSpot.get();

            for (FileData image : spot.getImages()) {
                storageService.deleteImageFromFileSystem(image.getName());
            }

            for (FileData menuImage : spot.getMenuImages()) {
                storageService.deleteImageFromFileSystem(menuImage.getName());
            }

            for (Review review : spot.getReviews()) {
                reviewRepository.delete(review);
            }

            spotRepository.delete(spot);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }
}