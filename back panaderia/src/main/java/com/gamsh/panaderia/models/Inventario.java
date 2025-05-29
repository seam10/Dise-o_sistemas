package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
public class Inventario extends ABaseEntity {

    @Column(nullable = false, length = 100)
    private String nombre;  // Nombre del producto

    @Column(name = "stock_minimo", nullable = false)
    private int stockMinimo;  // Stock mínimo

    @Column(name = "cantidad", nullable = false)
    private int cantidad;  // Cantidad disponible en inventario

    @Column(name = "precio", nullable = false)
    private double precio;  // Precio del producto

    public Inventario() {
        this.setStatus(true);
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(int stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }
}
