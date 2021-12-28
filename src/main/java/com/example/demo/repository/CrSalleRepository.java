package com.example.demo.repository;

import com.example.demo.model.CrSalle;
import com.example.demo.model.Salle;
import com.example.demo.model.SalleCrenauKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CrSalleRepository extends JpaRepository<CrSalle, SalleCrenauKey> {

    CrSalle findById(long idd);

}
