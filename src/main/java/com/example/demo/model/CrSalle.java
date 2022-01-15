package com.example.demo.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class CrSalle {
    @EmbeddedId
    private Key id;
    @Temporal(TemporalType.DATE)
    private Date a_date;
    @JoinColumn(name ="salle", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Salle salle;
    @JoinColumn(name ="crenaux", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Crenaux crenaux;
    private String status = "Non valide";


    public CrSalle() {
    }

    public CrSalle(Key id, Date date, Salle salle, Crenaux crenaux) {
        this.id = id;
        this.a_date = date;
        this.salle = salle;
        this.crenaux = crenaux;
    }

    public Key getId() {
        return id;
    }

    public void setId(Key id) {
        this.id = id;
    }

    public Date getDate() {
        return a_date;
    }

    public void setDate(Date date) {
        this.a_date = date;
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

    public Date getA_date() {
        return a_date;
    }

    public void setA_date(Date a_date) {
        this.a_date = a_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CrSalle{" +
                "id=" + id +
                ", a_date=" + a_date +
                ", salle=" + salle +
                ", crenaux=" + crenaux +
                ", status='" + status + '\'' +
                '}';
    }
}
