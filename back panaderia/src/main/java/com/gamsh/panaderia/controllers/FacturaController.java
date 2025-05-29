package com.gamsh.panaderia.controllers;


import org.springframework.web.bind.annotation.*;
import com.gamsh.panaderia.models.Factura;
import com.gamsh.panaderia.services.IService.IFacturaService;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
@RequestMapping("/api/facturas")
public class FacturaController extends ABaseController<Factura, IFacturaService> {

    private final IFacturaService facturaService;

    public FacturaController(IFacturaService facturaService) {
        super(facturaService, "Factura");
        this.facturaService = facturaService;
    }

    // Aquí puedes agregar métodos específicos, como filtrar por fecha, emitir reporte, etc.
}