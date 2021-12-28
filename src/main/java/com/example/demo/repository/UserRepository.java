package com.example.demo.repository;

import java.util.Optional;

import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface UserRepository extends JpaRepository<Users, Integer> {
    @Query(" select u from Users u " +
            " where u.username = ?1")
    Optional<Users> findUserWithName(String username);
}