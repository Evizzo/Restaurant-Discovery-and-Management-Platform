# **Restaurant Discovery and Management Platform**

## Overview

**For Users**

Search: Find restaurants by various tags.

Restaurant Profiles: View detailed profiles with images of menus and ambiance.

Reviews: Read reviews from previous guests to make informed decisions.

**For Spot Owners**

Profile Management: Create and manage your restaurant profile with separate images for the menu and ambiance.

Admin Approval: All restaurant profiles require approval from an admin before going live.

## Tools used

**Frontend**: Html, Css, React, BootStrap.

**Backend**: Java, Spring Boot, Spring Security, Jpa/Hibernate, TypeScript.

**Database**: MySQL.

**Other**: Docker, OAuth2.

## **Overview:**

**SpotController**

GET /spot: Retrieves all spots. Returns a list of SpotDto.

GET /spot/{spotId}: Retrieves a specific spot by its ID. Returns the SpotDto if found, otherwise throws a RuntimeException.

POST /spot: Adds a new spot with images and menu images. Requires spot_owner:create authority. Returns the saved Spot.

GET /spot/search: Searches for spots based on various criteria (e.g., name, city, working hours, amenities). Returns a list of SpotDto matching the search criteria.

PUT /spot/{spotId}: Updates a spot by its ID with new data and images. Requires spot_owner:update authority. Returns the updated SpotDto.

GET /spot/owned: Retrieves all spots owned by the currently authenticated user. Returns a list of SpotDto.

DELETE /spot/{spotId}: Deletes a spot by its ID. Requires spot_owner:delete authority. Returns 204 No Content if successful, 404 Not Found if the spot does not exist, or 500 Internal Server Error in case of an exception.

**ReviewController**

POST /review/{spotId}: Saves a new review for a specific spot. Expects a Review object and the spotId. Returns the saved review.

GET /review/{spotId}: Retrieves all reviews for a specific spot, optionally sorted by sortCriteria. Returns a list of ReviewDto.

DELETE /review/{reviewId}: Deletes a review by its ID. Returns a success message if the review is found and deleted, otherwise throws a RuntimeException if not found.

PUT /review/{reviewId}/like: Likes a specific review by its ID. Returns the updated review.

PUT /review/{reviewId}/dislike: Dislikes a specific review by its ID. Returns the updated review.

PUT /review/{reviewId}: Updates a review by its ID with the provided ReviewDto. Returns the updated review.

**AdminController**

PUT /admin/spot/approve/{spotId}: Approves a spot by its ID. Requires admin:update authority. Returns the approved spot or a 404 Not Found if the spot doesn't exist.

GET /admin/spot/unapproved: Retrieves a list of unapproved spots. Requires admin:read authority. Returns a list of unapproved spots.

GET /admin/spot/all: Retrieves a list of all spots. Requires admin:read authority. Returns a list of all spots.

DELETE /admin/spot/{spotId}: Deletes a spot by its ID. Requires admin:delete authority. Returns 204 No Content on success, or 404 Not Found if the spot doesn't exist.

DELETE /admin/review/{reviewId}: Deletes a review by its ID. Requires admin:delete authority. Returns a confirmation message on success.

**AuthenticationController**

POST /authenticate/logout - Logs out the currently authenticated user. It invalidates the user's session and provides an HTTP response indicating success.

GET /authenticate/google/userdetails - Retrieves user details from Google. This endpoint returns optional user details that may be null if no details are available.

### Security & Data Management

User Authentication: Secured with Spring Security, with OAuth2.

Data Management: Powered by JPA and Hibernate, with data stored in a MySQL database.
