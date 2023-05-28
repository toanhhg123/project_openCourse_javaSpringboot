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
import lombok.ToString;

@Entity
@Table(name = "RoleDB")
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
@ToString
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String roleName;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<Account> accounts;
}
