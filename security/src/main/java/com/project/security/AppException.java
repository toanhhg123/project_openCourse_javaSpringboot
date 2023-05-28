package com.project.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.project.security.models.ResponseObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class AppException {

    @ExceptionHandler(value={NoHandlerFoundException.class})
    @ResponseStatus(code=HttpStatus.BAD_REQUEST)
    public ResponseObject badRequest(Exception e, HttpServletRequest request, HttpServletResponse response) {
        e.printStackTrace();
        return new ResponseObject("faild", HttpStatus.BAD_REQUEST.getReasonPhrase(), null);
    }
}   