package com.project.security.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.security.models.OpenCourse;


public interface OpenCourseRepository extends JpaRepository<OpenCourse, Long> {
    List<OpenCourse> findByCourseId(long id);
}
