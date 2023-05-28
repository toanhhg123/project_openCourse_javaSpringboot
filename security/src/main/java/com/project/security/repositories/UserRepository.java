package com.project.security.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.security.models.Account;
import com.project.security.models.OpenCourse;

public interface UserRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByPhoneNumber(String phone);
    List<OpenCourse> findOpenCoursesById(long id); 
}
