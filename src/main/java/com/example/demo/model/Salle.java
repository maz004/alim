package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String code;
    private String type;
    private double capacite;
    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private List<Machine> machines;
    @ManyToOne
    private Bloc bloc;
    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private List<CrSalle> crsalless;

    public Salle() {
    }

    public List<CrSalle> getCrsalless() {
        return crsalless;
    }

    public void setCrsalless(List<CrSalle> crsalless) {
        this.crsalless = crsalless;
    }

    public Bloc getBloc() {
        return bloc;
    }

    public void setBloc(Bloc bloc) {
        this.bloc = bloc;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getCapacite() {
        return capacite;
    }

    public void setCapacite(double capacite) {
        this.capacite = capacite;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public void setMachines(List<Machine> machines) {
        this.machines = machines;
    }

    @Override
    public String toString() {
        return "Salle{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", type='" + type + '\'' +
                ", capacite=" + capacite +
                ", machines=" + machines +
                ", bloc=" + bloc +
                ", crsalless=" + crsalless +
                '}';
    }
}
