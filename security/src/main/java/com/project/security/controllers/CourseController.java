package com.project.security.controllers;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.security.models.Course;
import com.project.security.models.ResponseObject;
import com.project.security.repositories.CourseRepository;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {

   @Autowired
   CourseRepository courseRepository;
   private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

   @GetMapping("")
   public ResponseEntity<ResponseObject> index() {
      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "success", courseRepository.findAll()));
   }

   @GetMapping("/{id}")
   public ResponseEntity<ResponseObject> findById(@PathVariable long id) {
      try {
         Optional<Course> aOptional = courseRepository.findById(id);
         if (aOptional.isPresent())
            return ResponseEntity.status(HttpStatus.OK)
                  .body(new ResponseObject("ok", "get data success", aOptional));
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", "data  not found", null));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));
      }
   }

   @PostMapping("")
   public ResponseEntity<ResponseObject> Add(@RequestBody Course course) {
      try {
         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "create user success", courseRepository.save(course)));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @PatchMapping("/{id}")
   public ResponseEntity<ResponseObject> update(@RequestBody Course courseNew, @PathVariable Long id) {
      try {
         Optional<Course> aOptional = courseRepository.findById(id).map(item -> {
            item.setName(courseNew.getName());
            item.setCredits(courseNew.getCredits());
            return courseRepository.save(item);
         });

         if (!aOptional.isPresent())
            throw new Error("not found class");
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update class success", aOptional));

      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @DeleteMapping("/{id}")
   public ResponseEntity<ResponseObject> delete(@PathVariable long id) {
      try {
         courseRepository.deleteById(id);
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update class success", id));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }
}
