package com.project.security.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class OpenCourseDTO {
    long course_id; 
    long collegeClass_id;
    int lession;
    Date timeStart;
    Date opentTime;
    Date closeDate;   
}
