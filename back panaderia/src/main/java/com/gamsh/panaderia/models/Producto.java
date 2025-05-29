package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto extends ABaseEntity {

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "inventario_id")
    private Inventario inventario;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre; // Nombre del producto

    @Column(name = "precio", nullable = false)
    private double precio; // Precio del producto

    @Column(name = "cantidad", nullable = false)
    private int cantidad; // Cantidad del producto en inventario

    @Column(name = "descripcion", nullable = true, length = 255)
    private String descripcion; // Descripción del producto

    public Producto() {
        this.setStatus(true);
    }

    // Getter y Setter para el inventario
    public Inventario getInventario() {
        return inventario;
    }

    public void setInventario(Inventario inventario) {
        this.inventario = inventario;
    }

    // Getters y setters para los nuevos atributos
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

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
