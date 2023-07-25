package com.springboot.project.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

import com.springboot.project.management.model.Project;
import com.springboot.project.management.repository.ProjectRepository;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class ProjectController {

	@Autowired 
	private ProjectRepository projectRepository;
	
	//create project api
	@PostMapping("/project")
	public ResponseEntity<Map<String,String>> createProject(@RequestBody Project project) {
		//return projectRepository.save(project);
		 if (project != null) {
	       	 Map<String, String> successResponse = new HashMap<>();
	            successResponse.put("status","Success");
	            successResponse.put("message","Project inserted successfully");
	            return ResponseEntity.status(HttpStatus.OK).body(successResponse);
	   
	       }
	        
	        Map<String, String> errorResponse = new HashMap<>();
	        	errorResponse.put("status", "false");
	        	errorResponse.put("message", "Project not inserted");
	        
	        	return ResponseEntity.status(HttpStatus.OK).body(errorResponse);
	        
	    }
	
	
	//get all projects
	@GetMapping("/projects")
	public List<Project> getAllProject(){
        Sort sort = Sort.by(Sort.Direction.DESC, "projectId");
		return projectRepository.findAll(sort);
	}
	
	//update project api
	@PutMapping("/project/{projectId}")
	public ResponseEntity<Project> updateProject(@PathVariable Long projectId, @RequestBody Project projectDetails) {
		Project project = projectRepository.findById(projectId).orElseThrow();
		project.setProjectTheme(projectDetails.getProjectTheme());
		project.setReason(projectDetails.getReason());
		project.setType(projectDetails.getType());
		project.setDivision(projectDetails.getDivision());
		project.setCategory(projectDetails.getCategory());
		project.setPriority(projectDetails.getPriority());
		project.setDepartment(projectDetails.getDepartment());
		project.setLocation(projectDetails.getLocation());
		project.setStatus(projectDetails.getStatus());
	
		Project updateProject = projectRepository.save(project);
		return ResponseEntity.ok(updateProject);
	}
	
		
}
