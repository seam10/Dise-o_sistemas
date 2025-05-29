package com.gamsh.panaderia.repositories;

import org.springframework.stereotype.Repository;

import com.gamsh.panaderia.models.ReporteVenta;

@Repository
public interface IReporteVentaRepository extends IBaseRepository<ReporteVenta, Long> {
    // Métodos personalizados si se necesitan (por fecha, admin, etc.)
}
