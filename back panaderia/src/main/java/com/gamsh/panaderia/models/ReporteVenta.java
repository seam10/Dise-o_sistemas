package com.gamsh.panaderia.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reporte_venta")
public class ReporteVenta extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "factura_id", nullable = false)
    private Factura factura;

    @Column(name = "fecha_reporte", nullable = false)
    private LocalDateTime fechaReporte;

    @Column(name = "monto_total", nullable = false)
    private double montoTotal;

    @Column(name = "cantidad_productos", nullable = false)
    private int cantidadProductos;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "administrador_id")
    private Administrador administrador;

    public ReporteVenta() {
        this.fechaReporte = LocalDateTime.now();
        this.setStatus(true);
    }

    // Getters y Setters

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public LocalDateTime getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(LocalDateTime fechaReporte) {
        this.fechaReporte = fechaReporte;
    }

    public double getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(double montoTotal) {
        this.montoTotal = montoTotal;
    }

    public int getCantidadProductos() {
        return cantidadProductos;
    }

    public void setCantidadProductos(int cantidadProductos) {
        this.cantidadProductos = cantidadProductos;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }
}
