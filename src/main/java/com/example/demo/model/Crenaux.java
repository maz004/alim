package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Crenaux {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String heureDebut;
    private String heureFin;
    @OneToMany(mappedBy = "crenaux")
    @JsonIgnore
    private List<CrSalle> crsalles;

    public Crenaux() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(String heureDebut) {
        this.heureDebut = heureDebut;
    }

    public String getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(String heureFin) {
        this.heureFin = heureFin;
    }

    public List<CrSalle> getCrsalles() {
        return crsalles;
    }

    public void setCrsalles(List<CrSalle> crsalles) {
        this.crsalles = crsalles;
    }

    @Override
    public String toString() {
        return "Crenaux{" +
                "id=" + id +
                ", heureDebut='" + heureDebut + '\'' +
                ", heureFin='" + heureFin + '\'' +
                ", crsalles=" + crsalles +
                '}';
    }
}
