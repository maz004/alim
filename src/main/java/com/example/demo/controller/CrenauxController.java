package com.example.demo.controller;

import com.example.demo.model.Bloc;
import com.example.demo.model.Crenaux;
import com.example.demo.repository.BlocRepository;
import com.example.demo.repository.CrenauxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("crenauxs")
public class CrenauxController {

    @Autowired
    private CrenauxRepository crenauxRepository;

    @GetMapping("/all")
    public List<Crenaux> findAll() { return crenauxRepository.findAll();}

    @GetMapping(value = "/count")
    public long count() {return crenauxRepository.count();}

    @PostMapping("/save")
    public void save(@RequestBody Crenaux cr)
    {crenauxRepository.save(cr);}

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable(required = true) String id){
        System.out.println("id=" +id);
        Crenaux cr = crenauxRepository.findById(Long.parseLong(id));
        crenauxRepository.delete(cr);
    }


}
