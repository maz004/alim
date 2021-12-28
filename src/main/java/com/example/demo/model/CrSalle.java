package com.example.demo.model;

import org.hibernate.annotations.Generated;

import javax.persistence.*;
import java.util.Date;

@Entity
public class CrSalle {
    @EmbeddedId
    private SalleCrenauKey id;
    @Temporal(TemporalType.DATE)
    private Date date;
    @JoinColumn(name ="salle", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Salle salle;
    @JoinColumn(name ="crenaux", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Crenaux crenaux;


    public CrSalle() {
    }

    public CrSalle(SalleCrenauKey id, Date date, Salle salle, Crenaux crenaux) {
        this.id = id;
        this.date = date;
        this.salle = salle;
        this.crenaux = crenaux;
    }

    public SalleCrenauKey getId() {
        return id;
    }

    public void setId(SalleCrenauKey id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public Crenaux getCrenaux() {
        return crenaux;
    }

    public void setCrenaux(Crenaux crenaux) {
        this.crenaux = crenaux;
    }

    @Override
    public String toString() {
        return "CrSalle{" +
                "id=" + id +
                ", date=" + date +
                ", salle=" + salle +
                ", crenaux=" + crenaux +
                '}';
    }
}
