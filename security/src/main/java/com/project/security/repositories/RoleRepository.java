package com.project.security.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.security.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
