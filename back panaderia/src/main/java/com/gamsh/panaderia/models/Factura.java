package com.gamsh.panaderia.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "factura")
public class Factura extends ABaseEntity {

    @Column(name = "fecha_emision", nullable = false)
    private LocalDateTime fechaEmision;

    @Column(nullable = false)
    private double total;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Carrito> productos;

    public Factura() {
        this.fechaEmision = LocalDateTime.now();
        this.setStatus(true);
    }

    // Getters y setters

    public LocalDateTime getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDateTime fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<Carrito> getProductos() {
        return productos;
    }

    public void setProductos(List<Carrito> productos) {
        this.productos = productos;
    }
}
