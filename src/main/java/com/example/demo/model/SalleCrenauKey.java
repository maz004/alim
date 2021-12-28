package com.example.demo.model;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Embeddable
public class SalleCrenauKey implements Serializable {
    private static final long serialVersionUID = 1L;
    private long salle;
    private long crenaux;

    public SalleCrenauKey() {
    }

    public SalleCrenauKey(long salle, long crenaux) {
        this.salle = salle;
        this.crenaux = crenaux;
    }

    public long getSalle() {
        return salle;
    }

    public void setSalle(long salle) {
        this.salle = salle;
    }

    public long getCrenaux() {
        return crenaux;
    }

    public void setCrenaux(long crenaux) {
        this.crenaux = crenaux;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SalleCrenauKey that = (SalleCrenauKey) o;
        return salle == that.salle && crenaux == that.crenaux;
    }

    @Override
    public int hashCode() {
        return Objects.hash(salle, crenaux);
    }
}
