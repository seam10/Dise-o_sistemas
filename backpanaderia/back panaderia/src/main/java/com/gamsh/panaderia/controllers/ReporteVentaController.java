package com.gamsh.panaderia.controllers;


import org.springframework.web.bind.annotation.*;
import com.gamsh.panaderia.models.ReporteVenta;
import com.gamsh.panaderia.services.IService.IReporteVentaService;

@CrossOrigin(origins = "*") // O usa "http://localhost:8100" si deseas limitarlo
@RestController
@RequestMapping("/api/reporte_venta")
public class ReporteVentaController extends ABaseController<ReporteVenta, IReporteVentaService> {

    private final IReporteVentaService reporteVentaService;

    public ReporteVentaController(IReporteVentaService reporteVentaService) {
        super(reporteVentaService, "Reporte de Venta");
        this.reporteVentaService = reporteVentaService;
    }

    // Métodos personalizados como generar por fecha, admin, etc.
}