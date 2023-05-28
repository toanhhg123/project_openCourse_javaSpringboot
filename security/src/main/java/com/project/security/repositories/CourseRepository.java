package com.project.security.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.security.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
