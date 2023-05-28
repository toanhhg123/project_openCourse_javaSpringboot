package com.project.security.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.security.models.ResponseObject;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<ResponseObject> register(
      @RequestBody RegisterRequest request) {
    try {
      var data = service.register(request);
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "created user success", data));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));
    }
  }

  @PostMapping("/authenticate")
  public ResponseEntity<ResponseObject> authenticate(
      @RequestBody AuthenticationRequest request) {
    try {

      var data = service.authenticate(request);
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update user success", data));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));
    }

  }

}