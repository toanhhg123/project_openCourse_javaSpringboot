package com.project.security.models;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "OpenCourse")
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class OpenCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    Course course;

   
    @ManyToOne
    @JoinColumn(name = "collegeClass_id")
    CollegeClass collegeClass;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "account_opencourse", 
      joinColumns = @JoinColumn(name = "account_id"), 
      inverseJoinColumns = @JoinColumn(name = "opencourse_id")) 
    List<Account>  students;
    
    int lession;

    Date timeStart;

    Date opentTime;
    Date closeDate;
}
