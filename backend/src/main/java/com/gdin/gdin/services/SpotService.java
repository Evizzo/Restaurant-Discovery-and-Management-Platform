package com.gdin.gdin.services;

import com.gdin.gdin.config.SpotSpecification;
import com.gdin.gdin.controllers.SpotController;
import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.dtos.UserDto;
import com.gdin.gdin.entities.Review;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.entities.User;
import com.gdin.gdin.enums.*;
import com.gdin.gdin.repositories.ReviewRepository;
import com.gdin.gdin.repositories.SpotRepository;
import com.gdin.gdin.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.gdin.gdin.entities.FileData;

import java.io.IOException;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@AllArgsConstructor
@Service
public class SpotService {
    private final SpotRepository spotRepository;
    private final ReviewService reviewService;
    private final UserRepository userRepository;
    private final UserService userService;
    private final StorageService storageService;
    private final ReviewRepository reviewRepository;

    private static final Logger logger = LoggerFactory.getLogger(SpotController.class);

    public SpotDto convertToDto(Spot spot) {
        List<ReviewDto> reviews = reviewService.getAllReviewsForSpot(spot.getSpotId(), null);

        UserDto owner = null;
        if (spot.getOwner() != null) {
            owner = userService.convertToDto(spot.getOwner());
        } else {
            logger.warn("Spot with ID " + spot.getSpotId() + " does not have an owner. ---- 0000" + spot);
        }
        List<String> imageFilePaths = spot.getImages().stream()
                .map(FileData::getFilePath)
                .collect(Collectors.toList());

        List<String> menuImageFilePaths = spot.getMenuImages().stream()
                .map(FileData::getFilePath)
                .collect(Collectors.toList());

        return SpotDto.builder()
                .spotId(spot.getSpotId())
                .name(spot.getName())
                .description(spot.getDescription())
                .city(spot.getCity())
                .address(spot.getAddress())
                .googleMapsUrl(spot.getGoogleMapsUrl())
                .websiteUrl(spot.getWebsiteUrl())
                .workingFrom(spot.getWorkingFrom())
                .workingTo(spot.getWorkingTo())
                .alwaysOpen(spot.getAlwaysOpen())
                .phoneNumber(spot.getPhoneNumber())
                .email(spot.getEmail())
                .instagram(spot.getInstagram())
                .tiktok(spot.getTiktok())
                .facebook(spot.getFacebook())
                .outdoorSeating(spot.getOutdoorSeating())
                .wifiAvailable(spot.getWifiAvailable())
                .parking(spot.getParking())
                .petsAllowed(spot.getPetsAllowed())
                .hasSpecialDietaryOptionVegetarian(spot.getHasSpecialDietaryOptionVegetarian())
                .hasSpecialDietaryOptionVegan(spot.getHasSpecialDietaryOptionVegan())
                .hasSpecialDietaryOptionGlutenFree(spot.getHasSpecialDietaryOptionGlutenFree())
                .hasFitnessMenu(spot.getHasFitnessMenu())
                .hasPosnaFood(spot.getHasPosnaFood())
                .spotType(spot.getSpotType())
                .musicTypes(spot.getMusicTypes())
                .ambianceTypes(spot.getAmbianceTypes())
                .cuisineTypes(spot.getCuisineTypes())
                .availableActivities(spot.getAvailableActivities())
                .reviewsCount(spot.getReviewsCount())
                .hasBreakfast(spot.getHasBreakfast())
                .reviews(reviews)
                .owner(owner)
                .totalReview(spot.getTotalReview())
                .images(imageFilePaths)
                .menuImages(menuImageFilePaths)
                .imagesFD(spot.getImages())
                .menuImagesFD(spot.getMenuImages())
                .build();
    }

    public List<SpotDto> retrieveAllSpots(){
        return spotRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<SpotDto> findSpotById(UUID spotId){
        return spotRepository.findById(spotId)
                .map(this::convertToDto);
    }

    public Spot saveSpot(Spot spot, List<MultipartFile> imageFiles, List<MultipartFile> menuImageFiles) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> user = userRepository.findByEmail(userEmail);

        spot.setReviewsCount(0);
        spot.setTotalReview(0);
        user.ifPresent(spot::setOwner);

        Spot savedSpot = spotRepository.save(spot);

        for (MultipartFile file : imageFiles) {
            FileData fileData = storageService.uploadImageToFileSystem(file, String.valueOf(spot.getSpotId()));
            savedSpot.addImage(fileData);
        }

        for (MultipartFile file : menuImageFiles) {
            FileData fileData = storageService.uploadMenuImageToFileSystem(file, String.valueOf(spot.getSpotId()));
            savedSpot.addMenuImage(fileData);
        }

        spotRepository.save(savedSpot);

        return savedSpot;
    }

    public List<SpotDto> searchSpots(
            String name,
            String city,
            Integer workingFrom,
            Integer workingTo,
            Boolean alwaysOpen,
            Boolean outdoorSeating,
            Boolean wifiAvailable,
            Boolean parking,
            Boolean petsAllowed,
            Boolean hasSpecialDietaryOptionVegetarian,
            Boolean hasSpecialDietaryOptionVegan,
            Boolean hasSpecialDietaryOptionGlutenFree,
            Boolean hasFitnessMenu,
            Boolean hasPosnaFood,
            Boolean hasBreakfast,
            SpotTypes spotType,
            Set<MusicTypes> musicTypes,
            Set<AmbianceTypes> ambianceTypes,
            Set<CuisineTypes> cuisineTypes,
            Set<AvailableActivities> availableActivities) {

        Specification<Spot> spec = SpotSpecification.searchSpot(
                name, city, workingFrom, workingTo, alwaysOpen,
                outdoorSeating, wifiAvailable, parking,
                petsAllowed, hasSpecialDietaryOptionVegetarian, hasSpecialDietaryOptionVegan,
                hasSpecialDietaryOptionGlutenFree, hasFitnessMenu, hasPosnaFood, hasBreakfast,
                spotType, musicTypes, ambianceTypes, cuisineTypes, availableActivities);

        List<Spot> spots = spotRepository.findAll(spec);

        return spots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SpotDto updateSpot(UUID spotId, Spot updatedSpot, List<MultipartFile> newImageFiles, List<MultipartFile> newMenuImageFiles) throws IOException {
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);
        if (optionalSpot.isEmpty()) {
            return null;
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Spot existingSpot = optionalSpot.get();

//        if (!Objects.equals(userEmail, existingSpot.getOwner().getEmail())){
//            throw new RuntimeException("Unauthorised access.");
//        }

        if (updatedSpot.getName() != null) {
            existingSpot.setName(updatedSpot.getName());
        }
        if (updatedSpot.getDescription() != null) {
            existingSpot.setDescription(updatedSpot.getDescription());
        }
        if (updatedSpot.getCity() != null) {
            existingSpot.setCity(updatedSpot.getCity());
        }
        if (updatedSpot.getAddress() != null) {
            existingSpot.setAddress(updatedSpot.getAddress());
        }
        if (updatedSpot.getGoogleMapsUrl() != null) {
            existingSpot.setGoogleMapsUrl(updatedSpot.getGoogleMapsUrl());
        }
        if (updatedSpot.getWebsiteUrl() != null) {
            existingSpot.setWebsiteUrl(updatedSpot.getWebsiteUrl());
        }
        if (updatedSpot.getWorkingFrom() != null) {
            existingSpot.setWorkingFrom(updatedSpot.getWorkingFrom());
        }
        if (updatedSpot.getWorkingTo() != null) {
            existingSpot.setWorkingTo(updatedSpot.getWorkingTo());
        }
        if (updatedSpot.getAlwaysOpen() != null) {
            existingSpot.setAlwaysOpen(updatedSpot.getAlwaysOpen());
        }
        if (updatedSpot.getPhoneNumber() != null) {
            existingSpot.setPhoneNumber(updatedSpot.getPhoneNumber());
        }
        if (updatedSpot.getEmail() != null) {
            existingSpot.setEmail(updatedSpot.getEmail());
        }
        if (updatedSpot.getInstagram() != null) {
            existingSpot.setInstagram(updatedSpot.getInstagram());
        }
        if (updatedSpot.getTiktok() != null) {
            existingSpot.setTiktok(updatedSpot.getTiktok());
        }
        if (updatedSpot.getFacebook() != null) {
            existingSpot.setFacebook(updatedSpot.getFacebook());
        }
        if (updatedSpot.getOutdoorSeating() != null) {
            existingSpot.setOutdoorSeating(updatedSpot.getOutdoorSeating());
        }
        if (updatedSpot.getWifiAvailable() != null) {
            existingSpot.setWifiAvailable(updatedSpot.getWifiAvailable());
        }
        if (updatedSpot.getParking() != null) {
            existingSpot.setParking(updatedSpot.getParking());
        }
        if (updatedSpot.getPetsAllowed() != null) {
            existingSpot.setPetsAllowed(updatedSpot.getPetsAllowed());
        }
        if (updatedSpot.getHasSpecialDietaryOptionVegetarian() != null) {
            existingSpot.setHasSpecialDietaryOptionVegetarian(updatedSpot.getHasSpecialDietaryOptionVegetarian());
        }
        if (updatedSpot.getHasSpecialDietaryOptionVegan() != null) {
            existingSpot.setHasSpecialDietaryOptionVegan(updatedSpot.getHasSpecialDietaryOptionVegan());
        }
        if (updatedSpot.getHasSpecialDietaryOptionGlutenFree() != null) {
            existingSpot.setHasSpecialDietaryOptionGlutenFree(updatedSpot.getHasSpecialDietaryOptionGlutenFree());
        }
        if (updatedSpot.getHasFitnessMenu() != null) {
            existingSpot.setHasFitnessMenu(updatedSpot.getHasFitnessMenu());
        }
        if (updatedSpot.getHasPosnaFood() != null) {
            existingSpot.setHasPosnaFood(updatedSpot.getHasPosnaFood());
        }
        if (updatedSpot.getHasBreakfast() != null) {
            existingSpot.setHasBreakfast(updatedSpot.getHasBreakfast());
        }
        if (updatedSpot.getSpotType() != null) {
            existingSpot.setSpotType(updatedSpot.getSpotType());
        }
        if (updatedSpot.getMusicTypes() != null) {
            existingSpot.setMusicTypes(updatedSpot.getMusicTypes());
        }
        if (updatedSpot.getAmbianceTypes() != null) {
            existingSpot.setAmbianceTypes(updatedSpot.getAmbianceTypes());
        }
        if (updatedSpot.getCuisineTypes() != null) {
            existingSpot.setCuisineTypes(updatedSpot.getCuisineTypes());
        }
        if (updatedSpot.getAvailableActivities() != null) {
            existingSpot.setAvailableActivities(updatedSpot.getAvailableActivities());
        }

        Set<String> existingImagePaths = existingSpot.getImages().stream()
                .map(FileData::getFilePath)
                .collect(Collectors.toSet());

        Set<String> existingMenuImagePaths = existingSpot.getMenuImages().stream()
                .map(FileData::getFilePath)
                .collect(Collectors.toSet());

        Set<String> newImageFileNames = newImageFiles.stream()
                .map(MultipartFile::getOriginalFilename)
                .collect(Collectors.toSet());

        Set<String> newMenuImageFileNames = newMenuImageFiles.stream()
                .map(MultipartFile::getOriginalFilename)
                .collect(Collectors.toSet());

        Iterator<FileData> imageIterator = existingSpot.getImages().iterator();
        while (imageIterator.hasNext()) {
            FileData fileData = imageIterator.next();
            if (!newImageFileNames.contains(fileData.getName())) {
                storageService.deleteImageFromFileSystem(fileData.getName());
                imageIterator.remove();
            }
        }

        Iterator<FileData> menuImageIterator = existingSpot.getMenuImages().iterator();
        while (menuImageIterator.hasNext()) {
            FileData fileData = menuImageIterator.next();
            if (!newMenuImageFileNames.contains(fileData.getName())) {
                storageService.deleteImageFromFileSystem(fileData.getName());
                menuImageIterator.remove();
            }
        }

        for (MultipartFile file : newImageFiles) {
            if (!existingImagePaths.contains(file.getOriginalFilename())) {
                FileData fileData = storageService.uploadImageToFileSystem(file, String.valueOf(spotId));
                existingSpot.addImage(fileData);
            }
        }

        for (MultipartFile file : newMenuImageFiles) {
            if (!existingMenuImagePaths.contains(file.getOriginalFilename())) {
                FileData fileData = storageService.uploadMenuImageToFileSystem(file, String.valueOf(spotId));
                existingSpot.addMenuImage(fileData);
            }
        }

        Spot updatedSpotReturned = spotRepository.save(existingSpot);
        return convertToDto(updatedSpotReturned);
    }

    public List<SpotDto> getEventsByPublisherId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> user = userRepository.findByEmail(userEmail);
        List<Spot> spots = spotRepository.findByOwnerIdOrderByNameAsc(user.get().getId());

        return spots.stream()
                .map(this::convertToDto)
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