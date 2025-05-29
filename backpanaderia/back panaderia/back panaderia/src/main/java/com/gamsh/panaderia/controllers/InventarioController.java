package com.gamsh.panaderia.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamsh.panaderia.models.Inventario;
import com.gamsh.panaderia.services.IService.IInventarioService;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
@RequestMapping("/api/inventario")
public class InventarioController extends ABaseController<Inventario, IInventarioService> {

    private final IInventarioService inventarioService;

    public InventarioController(IInventarioService inventarioService) {
        super(inventarioService, "Inventario");
        this.inventarioService = inventarioService;
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<?> obtenerPorProducto(@PathVariable Long productoId) {
        try {
            Inventario inventario = inventarioService.obtenerPorProducto(productoId);
            return ResponseEntity.ok(inventario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se encontró inventario para ese producto.");
        }
    }
}
