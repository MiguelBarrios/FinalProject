package com.skilldistillery.daytrainer.controllers;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.daytrainer.entities.User;
import com.skilldistillery.daytrainer.services.UserService;

@RequestMapping("api")
@RestController
@CrossOrigin({ "*", "http://localhost" })
@Configuration
@EnableScheduling
public class UserController {

	@Autowired
	private UserService userSvc;
	
	@GetMapping("users")
	public List<User> getAllUser(Principal principal,  HttpServletResponse res) {
		List<User> users = userSvc.getAllUsers(principal.getName());
		if (users == null) {
			res.setStatus(404);
		}
		return users;
	}

	@GetMapping("users/{userId}")
	public User getUser(Principal principal, @PathVariable Integer userId, HttpServletResponse res) {
		User user = userSvc.getUserById(userId, principal.getName());
		if (user == null) {
			res.setStatus(404);
		}
		return user;
	}

	@GetMapping("users/name/{userName}")
	public User getUserByUserName(Principal principal, @PathVariable String userName, HttpServletResponse res) {
		User user = userSvc.getUserByUsername(userName, principal.getName());
		if (user == null) {
			res.setStatus(404);
		}
		return user;
	}

	@PutMapping("users")
	public User updateUser(Principal principal, HttpServletRequest req, HttpServletResponse res, @RequestBody User user) {
		System.out.print("*******************testing");
		try {
			user = userSvc.update(principal.getName(), user);
			if (user == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}

		return user;
	}

	@DeleteMapping("users/{userId}")
	public void destroy(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable int userId) {
		userSvc.destroy(principal.getName(), userId);

	}

	// cron = "* * 1 * * MON-FRI",zone = "GMT-5"
	@Scheduled(fixedDelay = 7, timeUnit = TimeUnit.DAYS)
	public void payDay() {
		// 10:15 AM on the 1st day of every month in central standard time
		userSvc.payDay();
		System.out.println("pay Day!!");
	}

}
