package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "carrito")
public class Carrito extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inventario_id", nullable = false)
    private Inventario inventario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "factura_id")
    private Factura factura;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "subtotal", nullable = false)
    private double subtotal;

    public Carrito() {}

    public Carrito(Inventario inventario, Factura factura, int cantidad, double subtotal) {
        this.inventario = inventario;
        this.factura = factura;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.setStatus(true);
    }

    // Getters y Setters


    public Inventario getInventario() {
        return inventario;
    }

    public void setInventario(Inventario inventario) {
        this.inventario = inventario;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}
