package com.example.demo.controller;

import com.example.demo.model.CrSalle;
import com.example.demo.model.Produit;
import com.example.demo.model.SalleCrenauKey;
import com.example.demo.repository.CrSalleRepository;
import com.example.demo.repository.CrenauxRepository;
import com.example.demo.repository.ProduitRepository;
import com.example.demo.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("crsalles")

public class CrSalleController {

	@Autowired
	private CrSalleRepository crSalleRepository;

	@Autowired
	private SalleRepository salleRepository;

	@Autowired
	private CrenauxRepository crenauxRepository;

	@GetMapping("/all")
	public List<CrSalle> findAll() {
		return crSalleRepository.findAll();
	}

	@PostMapping("/save")
	public void save(@RequestBody CrSalle crs) {
		/*/crs.setSalle(salleRepository.findById(crs.getSalle().getId()));
		crs.setCrenaux(crenauxRepository.findById(crs.getCrenaux().getId()));
		crs.getCrenaux().getCrsalles().add(crs);
		crs.getSalle().getCrsalless().add(crs);/*/
		CrSalle crs2 = new CrSalle(new SalleCrenauKey(crs.getSalle().getId(),crs.getCrenaux().getId()),crs.getDate(),crs.getSalle(),crs.getCrenaux());
		crSalleRepository.save(crs2);
	}

	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable(required = true) String id) {
		System.out.println("id = "+id);
		CrSalle crs = crSalleRepository.findById(Long.parseLong(id));
		crSalleRepository.delete(crs);
	}
	
	@GetMapping(value = "/count")
	public long count() {
		return crSalleRepository.count();
	}

}
