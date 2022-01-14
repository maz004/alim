package com.example.demo.controller;

import com.example.demo.model.CrSalle;
import com.example.demo.model.Crenaux;
import com.example.demo.model.Key;
import com.example.demo.model.Users;
import com.example.demo.repository.CrSalleRepository;
import com.example.demo.repository.CrenauxRepository;
import com.example.demo.repository.SalleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("crsalles")

public class CrSalleController {

    @Autowired
    private CrSalleRepository crSalleRepository;

    @Autowired
    private UserRepository u;

    @Autowired
    private GetUserWithHTTPServletRequestController oui;

    @GetMapping("/all")
    public List<CrSalle> findAll() {

        return crSalleRepository.findAll();
    }

    @PostMapping("/save")
    public void save(@RequestBody CrSalle crs) {
        crSalleRepository.save(new CrSalle(new Key(crs.getSalle().getId(), crs.getCrenaux().getId()), crs.getDate(), crs.getSalle(), crs.getCrenaux()));
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        System.out.println("id = " + id);
        CrSalle crs = crSalleRepository.findById(Long.parseLong(id));
        crSalleRepository.delete(crs);
    }

    @GetMapping(value = "/count")
    public long count() {

        return crSalleRepository.count();
    }

    @GetMapping("/alll")
    public CrSalle findByIdd(String salle, String crenaux) {
        List<CrSalle> lst = crSalleRepository.findAll();
        CrSalle crs2 = null;
        for (CrSalle crs : lst) {
            if (crs.getSalle().getId() == Integer.parseInt(salle) && crs.getCrenaux().getId() == Integer.parseInt(crenaux)) {
                crs2 = crs;
            }
        }
        return crs2;
    }

    @DeleteMapping(value = "/deletee/{salle,crenaux}")
    public void delete(String salle, String creneaux) {
        CrSalle crs = findByIdd(salle, creneaux);
        String admin = "admin";
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        String rej = "rejette";
        String encr = "En cour de traitement";
        String user = "user";
        String pp = "Non valide";
        if (username.equals(admin)) {
            crSalleRepository.delete(crs);
        } else if (username.equals(user) && (crs.getStatus().equals(encr) || crs.getStatus().equals(pp))) {
            crSalleRepository.delete(crs);
        }
    }

    @RequestMapping(value = "/myusername", method = RequestMethod.GET)
    @ResponseBody
    public String currentUserName(Principal principal) {
        return principal.getName();
    }

    @PostMapping(value = "/findme/{salle,crenaux}")
    public void valider(String salle, String creneaux) {
        String admin = "admin";
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        CrSalle crs = findByIdd(salle, creneaux);
        String valide = "valide";
        String user = "user";
        String reject = "rejette";
        String trt = "Non valide";

        if (username.equals(admin)) {
            crs.setStatus("valide");
            crSalleRepository.save(crs);
        } else if (username.equals(user) && (crs.getStatus().equals(reject) || crs.getStatus().equals(trt))) {
            crs.setStatus("En cour de traitement");
            crSalleRepository.save(crs);
        }

    }

    @PostMapping(value = "/reject/{salle,crenaux}")
    public void reject(String salle, String creneaux) {
        String admin = "admin";
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        CrSalle crs = findByIdd(salle, creneaux);

        if (username.equals(admin)) {
            crs.setStatus("rejette");
            crSalleRepository.save(crs);
        }

    }

    @PostMapping(value = "/dash/{salle}")
    public String dash(String salle) {
        List<CrSalle> list = crSalleRepository.findAll();
        String result = "Liste des reservation pour cette salle \n";
        for (CrSalle i : list) {
            if (i.getSalle().getType().equals(salle)) {
                result += "------------------------------ \n" + "-Date : " + i.getDate() + " -Creneaux " + i.getCrenaux().getShTime() + "\n";
            }
        }

        return result;


    }
}
