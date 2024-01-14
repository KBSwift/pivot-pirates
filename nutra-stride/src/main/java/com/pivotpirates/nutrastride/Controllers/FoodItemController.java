import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.pivotpirates.nutrastride.Models.FoodItemService;
import com.pivotpirates.nutrastride.Models.FoodItem;


@RestController
@RequestMapping("/api/fooditems")
@CrossOrigin (origins = "http://localhost:5173/nutralog", maxAge = 3600, allowCredentials = "true")
public class FoodItemController {
    private final FoodItemService foodItemService;

    @Autowired
    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @GetMapping
<<<<<<< HEAD
    //@PreAuthorize("isAuthenticated()")
=======
//    @PreAuthorize("isAuthenticated()")
>>>>>>> 18fe3d029c2826b427045382625108bdc9b1912b
    public ResponseEntity<List<FoodItem>> getAllFoodItems() {

        System.out.println("Received GET request to /api/fooditems");

        List<FoodItem> foodItems = foodItemService.getAllFoodItems();

        System.out.println("Returning response from GET request to /api/fooditems");

        return new ResponseEntity<>(foodItems, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FoodItem> createFoodItem(@RequestBody FoodItem foodItem) {

        System.out.println("Received POST request to /api/fooditems");

        try {
            FoodItem savedFoodItem = foodItemService.createFoodItem(foodItem);

            System.out.println("Returning response from POST request to /api/fooditems");

            return new ResponseEntity<>(savedFoodItem, HttpStatus.OK);
        } catch (Exception e) {

            System.out.println("Error processing POST request to /api/fooditems: " + e.getMessage());

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFoodItem(@PathVariable Long id) {

        System.out.println("Received DELETE request to /api/fooditems/" + id);

        try {
            foodItemService.deleteFoodItem(id);

            System.out.println("Returning response from DELETE request to /api/fooditems/" + id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {

            System.out.println("Error processing DELETE request to /api/fooditems/" + id + ": " + e.getMessage());

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(
            @PathVariable Long id,
            @RequestBody FoodItem updatedFoodItem
    ) {

        System.out.println("Received PUT request to /api/fooditems/" + id);

        try {
            FoodItem updatedItem = foodItemService.updateFoodItem(id, updatedFoodItem);

            System.out.println("Returning response from PUT request to /api/fooditems/" + id);

            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } catch (Exception e) {

            System.out.println("Error processing PUT request to /api/fooditems/" + id + ": " + e.getMessage());

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
