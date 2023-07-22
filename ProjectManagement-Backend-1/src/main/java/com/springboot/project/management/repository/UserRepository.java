package com.springboot.project.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.springboot.project.management.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

