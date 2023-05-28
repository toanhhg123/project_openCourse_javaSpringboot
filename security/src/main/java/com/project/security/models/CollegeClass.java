package com.project.security.models;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collegeClass")
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class CollegeClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String name;
    int qty;

    @OneToMany(mappedBy = "collegeClass")
    @JsonIgnore
    List<OpenCourse> openCourses;
}
