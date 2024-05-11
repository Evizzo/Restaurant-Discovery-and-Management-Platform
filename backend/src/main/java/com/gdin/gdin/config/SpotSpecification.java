package com.gdin.gdin.config;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.enums.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public class SpotSpecification {

    public static Specification<Spot> searchSpot(
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

        return (root, query, builder) -> {
            Predicate predicate = builder.conjunction();

            if (name != null) {
                predicate = builder.and(predicate, builder.like(root.get("name"), "%" + name + "%"));
            }

            if (city != null) {
                predicate = builder.and(predicate, builder.equal(root.get("city"), city));
            }

            if (workingFrom != null) {
                predicate = builder.and(predicate, builder.equal(root.get("workingFrom"), workingFrom));
            }

            if (workingTo != null) {
                predicate = builder.and(predicate, builder.equal(root.get("workingTo"), workingTo));
            }
            if (alwaysOpen != null && alwaysOpen) {
                predicate = builder.and(predicate, builder.equal(root.get("alwaysOpen"), alwaysOpen));
            }
            if (outdoorSeating != null && outdoorSeating) {
                predicate = builder.and(predicate, builder.equal(root.get("outdoorSeating"), outdoorSeating));
            }
            if (wifiAvailable != null && wifiAvailable) {
                predicate = builder.and(predicate, builder.equal(root.get("wifiAvailable"), wifiAvailable));
            }
            if (parking != null && parking) {
                predicate = builder.and(predicate, builder.equal(root.get("parking"), parking));
            }
            if (petsAllowed != null && petsAllowed) {
                predicate = builder.and(predicate, builder.equal(root.get("petsAllowed"), petsAllowed));
            }
            if (hasSpecialDietaryOptionVegetarian != null && hasSpecialDietaryOptionVegetarian) {
                predicate = builder.and(predicate, builder.equal(root.get("hasSpecialDietaryOptionVegetarian"), hasSpecialDietaryOptionVegetarian));
            }
            if (hasSpecialDietaryOptionVegan != null && hasSpecialDietaryOptionVegan) {
                predicate = builder.and(predicate, builder.equal(root.get("hasSpecialDietaryOptionVegan"), hasSpecialDietaryOptionVegan));
            }
            if (hasSpecialDietaryOptionGlutenFree != null && hasSpecialDietaryOptionGlutenFree) {
                predicate = builder.and(predicate, builder.equal(root.get("hasSpecialDietaryOptionGlutenFree"), hasSpecialDietaryOptionGlutenFree));
            }
            if (hasFitnessMenu != null && hasFitnessMenu) {
                predicate = builder.and(predicate, builder.equal(root.get("hasFitnessMenu"), hasFitnessMenu));
            }
            if (hasPosnaFood != null && hasPosnaFood) {
                predicate = builder.and(predicate, builder.equal(root.get("hasPosnaFood"), hasPosnaFood));
            }
            if (hasBreakfast != null && hasBreakfast) {
                predicate = builder.and(predicate, builder.equal(root.get("hasBreakfast"), hasBreakfast));
            }

            if (spotType != null) {
                predicate = builder.and(predicate, builder.equal(root.get("spotType"), spotType));
            }
            if (musicTypes != null && !musicTypes.isEmpty()) {
                Join<Spot, MusicTypes> musicJoin = root.join("musicTypes");
                predicate = builder.and(predicate, musicJoin.in(musicTypes));
            }
            if (ambianceTypes != null && !ambianceTypes.isEmpty()) {
                Join<Spot, AmbianceTypes> ambianceJoin = root.join("ambianceTypes");
                predicate = builder.and(predicate, ambianceJoin.in(ambianceTypes));
            }
            if (cuisineTypes != null && !cuisineTypes.isEmpty()) {
                Join<Spot, CuisineTypes> cuisineJoin = root.join("cuisineTypes");
                predicate = builder.and(predicate, cuisineJoin.in(cuisineTypes));
            }
            if (availableActivities != null && !availableActivities.isEmpty()) {
                Join<Spot, AvailableActivities> activitiesJoin = root.join("availableActivities");
                predicate = builder.and(predicate, activitiesJoin.in(availableActivities));
            }

            return predicate;
        };
    }
}