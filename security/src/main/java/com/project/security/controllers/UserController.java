package com.project.security.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.security.models.Account;
import com.project.security.models.ResponseObject;
import com.project.security.repositories.RoleRepository;
import com.project.security.repositories.UserRepository;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

   @Autowired
   UserRepository userRepository;

   @Autowired
   PasswordEncoder passwordEncoder;

   @Autowired
   RoleRepository roleRepository;

   @GetMapping("")
   public ResponseEntity<ResponseObject> index() {
      var users = userRepository.findAll();
      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "Query user success", users));
   }

   @GetMapping("/{id}")
   public ResponseEntity<ResponseObject> findById(@PathVariable long id) {
      Optional<Account> aOptional = userRepository.findById(id);
      if (aOptional.isPresent())
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "Query user success", aOptional.get().getOpenCourses()));
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", "user not found", null));
   }

   @GetMapping("/opencourses/{id}")
   public ResponseEntity<ResponseObject> findOpenCoursesById(@PathVariable long id) {
      var users = userRepository.findById(id);
      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "Query user success", users.get().getOpenCourses()));
   }

   @PostMapping("")
   public ResponseEntity<ResponseObject> AddUser(@RequestBody Account accountReq) {
      var role = roleRepository.findById(accountReq.getRole().getId());
      var account = Account.builder()
            .address(accountReq.getAddress())
            .role(role.get())
            .password(passwordEncoder.encode(accountReq.getPassword()))
            .phoneNumber(accountReq.getPhoneNumber())
            .userName(accountReq.getUsername())
            .build();

      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "create user success", userRepository.save(account)));

   }

   @PatchMapping("/{id}")
   public ResponseEntity<ResponseObject> update(@RequestBody Account newAccount, @PathVariable long id) {
      try {
         var role = roleRepository.findById(newAccount.getRole().getId());
         System.out.println(role.get().getRoleName());
   
         Optional<Account> aOptional = userRepository.findById(id).map(account -> {
            account.setAddress(newAccount.getAddress());
            account.setPhoneNumber(newAccount.getPhoneNumber());
            account.setUserName(newAccount.getUsername());
            account.setRole(role.get());

            return userRepository.save(account);
         });

         if (!aOptional.isPresent())
            throw new Error("not found user");
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update user success", aOptional));

      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @DeleteMapping("/{id}")
   public ResponseEntity<ResponseObject> deleteUser(@PathVariable long id) {
      try {
         userRepository.deleteById(id);
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "delete user success", id));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }
}
