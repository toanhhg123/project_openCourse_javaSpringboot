package com.project.security.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.project.security.models.CollegeClass;
import com.project.security.models.ResponseObject;
import com.project.security.repositories.CollegeClassRepository;

@RestController
@RequestMapping(path = "/api/v1/CollegeClass")
public class CollegeClassController {

   @Autowired
   CollegeClassRepository collegeClassRepository;
   private static final Logger logger = LoggerFactory.getLogger(CollegeClassController.class);

   @GetMapping("")
   public ResponseEntity<ResponseObject> index() {
      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "Query class success", collegeClassRepository.findAll()));
   }

   @GetMapping("/{id}")
   public ResponseEntity<ResponseObject> findById(@PathVariable long id) {
      Optional<CollegeClass> aOptional = collegeClassRepository.findById(id);
      if (aOptional.isPresent())
         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "Query CollegeClass success", aOptional));
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", "class  not found", null));

   }

   @PostMapping("")
   public ResponseEntity<ResponseObject> Add(@RequestBody CollegeClass collegeClass) {
      try {
         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "create user success", collegeClassRepository.save(collegeClass)));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @PatchMapping("/{id}")
   public ResponseEntity<ResponseObject> update(@RequestBody CollegeClass newClass, @PathVariable long id) {
      try {
         Optional<CollegeClass> aOptional = collegeClassRepository.findById(id).map(item -> {
            item.setQty(newClass.getQty());
            item.setName(newClass.getName());
            return collegeClassRepository.save(item);
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
         collegeClassRepository.deleteById(id);
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update class success", id));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }
}
