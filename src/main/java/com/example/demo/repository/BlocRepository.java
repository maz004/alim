package com.example.demo.repository;

import com.example.demo.model.Bloc;
import com.example.demo.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface BlocRepository extends JpaRepository<Bloc, Long> {

    Bloc findById(long id);
}
