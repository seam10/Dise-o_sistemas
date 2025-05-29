package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
public class Inventario extends ABaseEntity {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(name = "stock_minimo", nullable = false)
    private int stockMinimo;

    public Inventario() {
        this.setStatus(true);
    }

    // Getters y Setters

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(int stockMinimo) {
        this.stockMinimo = stockMinimo;
    }
}
