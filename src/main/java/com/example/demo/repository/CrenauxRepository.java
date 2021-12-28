package com.example.demo.repository;

import com.example.demo.model.Bloc;
import com.example.demo.model.Crenaux;
import com.example.demo.model.SalleCrenauKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CrenauxRepository extends JpaRepository<Crenaux, Long> {

    Crenaux findById(long id);
}
