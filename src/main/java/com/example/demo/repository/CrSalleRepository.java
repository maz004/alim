package com.example.demo.repository;

import com.example.demo.model.CrSalle;
import com.example.demo.model.Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CrSalleRepository extends JpaRepository<CrSalle, Key> {

    CrSalle findById(long idd);
    List<CrSalle> findBySalle_Id(String salle);

}
