package com.project.security.controllers;

import java.util.List;
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

import com.project.security.auth.dto.OpenCourseDTO;
import com.project.security.models.Account;
import com.project.security.models.CollegeClass;
import com.project.security.models.Course;
import com.project.security.models.OpenCourse;
import com.project.security.models.ResponseObject;
import com.project.security.repositories.CollegeClassRepository;
import com.project.security.repositories.CourseRepository;
import com.project.security.repositories.OpenCourseRepository;
import com.project.security.repositories.UserRepository;

@RestController
@RequestMapping(path = "/api/v1/opencoures")
public class OpenCourseController {

   @Autowired
   OpenCourseRepository OpenCourseRepository;

   @Autowired
   CourseRepository courseRepository;

   @Autowired
   CollegeClassRepository collegeClassRepository;

   @Autowired
   UserRepository userRepository;
   private static final Logger logger = LoggerFactory.getLogger(OpenCourseController.class);

   @GetMapping("")
   public ResponseEntity<ResponseObject> index() {
      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "Query class success", OpenCourseRepository.findAll()));
   }

   @GetMapping("/{id}")
   public ResponseEntity<ResponseObject> findById(@PathVariable long id) {
      Optional<OpenCourse> aOptional = OpenCourseRepository.findById(id);
      if (aOptional.isPresent())
         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "get data success", aOptional));
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", "data  not found", null));

   }

   @GetMapping("/course/{id}")
   public ResponseEntity<ResponseObject> getOpenCoursesByCourse(@PathVariable long id) {

      return ResponseEntity.status(HttpStatus.OK)
            .body(new ResponseObject("ok", "Query class success", OpenCourseRepository.findByCourseId(id)));

   }

   @PostMapping("")
   public ResponseEntity<ResponseObject> Add(@RequestBody OpenCourseDTO openCourseDTO) {
      try {
         Optional<CollegeClass> oClass = collegeClassRepository.findById(openCourseDTO.getCollegeClass_id());
         Optional<Course> oCourse = courseRepository.findById(openCourseDTO.getCourse_id());

         if (!oClass.isPresent() || !oCourse.isPresent())
            throw new Exception("not found class or Course");

         var openCourse = OpenCourse.builder()
               .course(oCourse.get())
               .collegeClass(oClass.get())
               .students(null)
               .lession(openCourseDTO.getLession())
               .timeStart(openCourseDTO.getTimeStart())
               .opentTime(openCourseDTO.getOpentTime())
               .closeDate(openCourseDTO.getCloseDate()).build();

         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "create user success", OpenCourseRepository.save(openCourse)));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @PatchMapping("/register/{opencourse_id}/{id}")
   public ResponseEntity<ResponseObject> Add(@PathVariable long opencourse_id, @PathVariable long id) {
      try {

         Optional<Account> acOptional = userRepository.findById(id);
         if (!acOptional.isPresent())
            throw new Exception("not found student or courses");
         Optional<OpenCourse> optional = OpenCourseRepository.findById(opencourse_id).map(item -> {
            var stu = item.getStudents()
                  .stream().filter(s -> s.getId() == acOptional.get().getId())
                  .findAny().orElse(null);
            if (stu == null) {
               item.getStudents().add(acOptional.get());
            }
            return OpenCourseRepository.save(item);
         });

         return ResponseEntity.status(HttpStatus.OK)
               .body(new ResponseObject("ok", "create user success", optional));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }

   @PatchMapping("/{id}")
   public ResponseEntity<ResponseObject> update(@RequestBody OpenCourseDTO openCourseNew, @PathVariable long id) {
      try {
         Optional<CollegeClass> oClass = collegeClassRepository.findById(openCourseNew.getCollegeClass_id());
         Optional<Course> oCourse = courseRepository.findById(openCourseNew.getCourse_id());

         Optional<OpenCourse> aOptional = OpenCourseRepository.findById(id).map(item -> {

            item.setCourse(oCourse.get());
            item.setCollegeClass(oClass.get());
            // item.setStudents(openCourseNew.getStudents());
            item.setLession(openCourseNew.getLession());
            item.setTimeStart(openCourseNew.getTimeStart());
            item.setOpentTime(openCourseNew.getOpentTime());
            item.setCloseDate(openCourseNew.getCloseDate());

            return OpenCourseRepository.save(item);
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
         OpenCourseRepository.deleteById(id);
         return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "update class success", id));
      } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("false", e.getMessage(), null));

      }

   }
}
