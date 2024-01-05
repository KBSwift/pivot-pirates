package com.pivotpirates.nutrastride.Controllers;

import com.pivotpirates.nutrastride.Models.AbstractEntity;
import com.pivotpirates.nutrastride.Models.Users;
import com.pivotpirates.nutrastride.Models.UserRepository;
import com.pivotpirates.nutrastride.Models.dto.LoginFormDTO;
import com.pivotpirates.nutrastride.Models.dto.RegisterFormDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Controller
@CrossOrigin (origins = "http://localhost:5173", maxAge = 3600)
public class AuthenticationController extends AbstractEntity {

    //Allows interaction between AC and UR
    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    //HttpSession, represents the sesssion associated with the current users use of the application
    public Users getUserFromSession(HttpSession session) {
        //Retrieves user Id, if null, returns null
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        //Retrieves user from database based on Id, returns optional because user may or may not exist
        Optional<Users> user = userRepository.findById(Long.valueOf(userId));
        //Checks if optional user is empty, returns null if so
        if (user.isEmpty()) {
            return null;
        }
        //If optional isn't empty, returns user from optional
        return user.get();
    }
    //Stores Id of the current user, allows association of the user with their user id across multiple aspects of the application
    private static void setUserInSession(HttpSession session, Users users) {
        session.setAttribute(userSessionKey, users.getId());
    }
    //Handles POST requests to the /register endpoint
    @PostMapping("/register")
    @CrossOrigin
    public String processRegistrationForm(@ModelAttribute @Valid RegisterFormDTO registerFormDTO,
                                          Errors errors, HttpServletRequest request,
                                          Model model) {
        //checks for validation errors
        if (errors.hasErrors()) {
            model.addAttribute("title", "Register");
            return "register";
        }
        //checks that a user with the given username exists
        Users existingUsers = userRepository.findByUsername(registerFormDTO.getUsername());

        if (existingUsers != null) {
            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
            model.addAttribute("title", "Register");
            return "register";
        }
        //checks that password and verifypassword match
        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
            model.addAttribute("title", "Register");
            return "register";
        }
        //Create a new user object, and save it to the database
        Users newUsers = new Users(registerFormDTO.getUsername(), registerFormDTO.getPassword());
        userRepository.save(newUsers);
        //Set the user in the session
        setUserInSession(request.getSession(), newUsers);
        //Redirect to /, which prevents the user from re-submitting the form if they refresh
        return "redirect:";
    }
    //Handles POST requests to the /login endpoint
    @CrossOrigin
    @PostMapping("/login")
    public String processLoginForm(@ModelAttribute @Valid LoginFormDTO loginFormDTO,
                                   Errors errors, HttpServletRequest request,
                                   Model model) {
        //checks for validation errors
        if (errors.hasErrors()) {
            model.addAttribute("title", "Log In");
            return "login";
        }
        //Retrieve user with given username
        Users theUsers = userRepository.findByUsername(loginFormDTO.getUsername());

        if (theUsers == null) {
            errors.rejectValue("username", "user.invalid", "The given username does not exist");
            model.addAttribute("title", "Log In");
            return "login";
        }
        // Checks if the given password is valid
        String password = loginFormDTO.getPassword();

        if (!theUsers.isMatchingPassword(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
            model.addAttribute("title", "Log In");
            return "login";
        }
        // Sets the user in the session, indicates a successful login
        setUserInSession(request.getSession(), theUsers);
        //Redirect to /, prevents issues with using the back button after a successful login
        return "redirect:/";
    }

    @GetMapping("/register")
    public String displayRegistrationForm(Model model) {
        model.addAttribute(new RegisterFormDTO());
        model.addAttribute("title", "Register");
        return "register";
    }

    @GetMapping("/login")
    public String displayLoginForm(Model model) {
        model.addAttribute(new LoginFormDTO());
        model.addAttribute("title", "Log In");
        return "login";
    }

}
