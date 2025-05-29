package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto extends ABaseEntity {

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private double precio;

    @Column(length = 255)
    private String descripcion;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    public Producto() {
        this.setStatus(true);
    }

    // Getters y Setters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
