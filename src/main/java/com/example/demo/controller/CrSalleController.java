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
		crSalleRepository.save(new CrSalle(new Key(crs.getSalle().getId(),crs.getCrenaux().getId()),crs.getDate(),crs.getSalle(),crs.getCrenaux()));
	}

	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable(required = true) String id) {
		System.out.println("id = "+id);
		CrSalle crs = crSalleRepository.findById(Long.parseLong(id));
		crSalleRepository.delete(crs);
	}

	@GetMapping(value = "/count")
	public long count() {
		Users u1 = new Users();
		Users u2 = new Users();
		u1.setUsername("admin");
		u1.setPassword("admin");
		u2.setUsername("user");
		u2.setPassword("user");
		u.save(u1);
		u.save(u2);
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
	public void delete( String salle, String creneaux) {
		CrSalle crs = findByIdd(salle,creneaux);
		crSalleRepository.delete(crs);
	}

	@RequestMapping(value = "/myusername", method = RequestMethod.GET)
	@ResponseBody
	public String currentUserName(Principal principal) {
		return principal.getName();
	}

	@PostMapping(value = "/findme/{salle,crenaux}")
	public void valider(String salle, String creneaux){
		String admin = "admin";
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		CrSalle crs = findByIdd(salle,creneaux);

		if( username.equals(admin)){
		crs.setStatus("valide");
		crSalleRepository.save(crs);
		}else{
			crs.setStatus("En cour de traitement");
			crSalleRepository.save(crs);
		}

}
	@PostMapping(value = "/reject/{salle,crenaux}")
	public void reject(String salle, String creneaux){
		String admin = "admin";
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		CrSalle crs = findByIdd(salle,creneaux);

		if( username.equals(admin)){
			crs.setStatus("rejette");
			crSalleRepository.save(crs);
		}

	}
}
