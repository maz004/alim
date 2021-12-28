package com.example.demo.controller;

import com.example.demo.model.Salle;
import com.example.demo.model.Users;
import com.example.demo.repository.BlocRepository;
import com.example.demo.repository.SalleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("salles")
public class SalleController {

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private BlocRepository blocRepository;

    @Autowired
    private UserRepository k;

    @GetMapping("/all")
    public List<Salle> findAll() {
        Users c = new Users();
        c.setUsername("admin");
        c.setPassword("admin");
        k.save(c);
        return salleRepository.findAll();
    }

    @GetMapping(value = "/count")
    public long count() {
        return salleRepository.count();
    }

    @PostMapping("/save")
    public void save(@RequestBody Salle salle)
    {
        salle.setBloc(blocRepository.findById(salle.getBloc().getId()));
        salleRepository.save(salle);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable(required = true) String id){
        System.out.println("id=" +id);
        Salle salle = salleRepository.findById(Long.parseLong(id));
        salleRepository.delete(salle);
    }


}
