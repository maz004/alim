package com.example.demo.repository;

import com.example.demo.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface SalleRepository extends JpaRepository<Salle, Long> {

    Salle findById(long id);
}
