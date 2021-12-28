package com.example.demo.controller;

import com.example.demo.model.Bloc;
import com.example.demo.model.Marque;
import com.example.demo.model.Salle;
import com.example.demo.repository.BlocRepository;
import com.example.demo.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("blocs")
public class BlocController {

    @Autowired
    private BlocRepository blocRepository;

    @GetMapping("/all")
    public List<Bloc> findAll() { return blocRepository.findAll();}

    @GetMapping(value = "/count")
    public Map<String, Integer> count (){
        Map<String, Integer> map = new HashMap<>();
        for(Bloc m : blocRepository.findAll()){
            map.put(m.getCode(), m.getSalles().size());
        }
        return map;
    }

    @PostMapping("/save")
    public void save(@RequestBody Bloc bloc)
    {blocRepository.save(bloc);}

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable(required = true) String id){
        System.out.println("id=" +id);
        Bloc bloc = blocRepository.findById(Long.parseLong(id));
        blocRepository.delete(bloc);
    }


}
