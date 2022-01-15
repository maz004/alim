package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Entity
public class Crenaux {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Time heureDebut;
    private Time heureFin;
    private String shTime;
    @OneToMany(mappedBy = "crenaux")
    @JsonIgnore
    private List<CrSalle> crsalles;

    public Crenaux() {
    }

    public List<CrSalle> getCrsalles() {
        return crsalles;
    }

    public void setCrsalles(List<CrSalle> crsalles) {
        this.crsalles = crsalles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Time getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(Time heureDebut) {
        this.heureDebut = heureDebut;
    }

    public Time getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(Time heureFin) {
        this.heureFin = heureFin;
    }

    public String getShTime() {
        return shTime;
    }

    public void setShTime(String shTime) {
        this.shTime = shTime;
    }

    @Override
    public String toString() {
        return "Crenaux{" +
                "id=" + id +
                ", heureDebut=" + heureDebut +
                ", heureFin=" + heureFin +
                ", shTime='" + shTime + '\'' +
                ", crsalles=" + crsalles +
                '}';
    }
}
