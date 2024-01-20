package hueta.weblab4.User;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        System.out.println(user.getId());
        userRepository.save(user);
    }

    @DeleteMapping("/users")
    void deleteUser(@RequestParam long userId) {
//        System.out.println("UserId is " + userId);
        userRepository.deleteById(userId);
    }

    /*@PutMapping("/users")
    void putUser(@RequestBody User user) {
        System.out.println("UserId is " + user.getId());
        userRepository.deleteById(user.getId());
    }*/
}

