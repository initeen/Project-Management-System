package com.springboot.project.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.project.management.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	
}
