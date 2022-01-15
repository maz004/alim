package com.example.demo.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class Key implements Serializable {
    private static final long serialVersionUID = 1L;
    private long salle;
    private long crenaux;

    public Key() {
    }

    public Key(long salle, long crenaux) {
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
        Key that = (Key) o;
        return salle == that.salle && crenaux == that.crenaux;
    }

    @Override
    public int hashCode() {
        return Objects.hash(salle, crenaux);
    }
}
