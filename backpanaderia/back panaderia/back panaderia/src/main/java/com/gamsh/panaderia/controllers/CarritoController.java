package com.gamsh.panaderia.controllers;

import com.gamsh.panaderia.models.Carrito;
import com.gamsh.panaderia.services.IService.ICarritoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
@RequestMapping("/api/carritos")
public class CarritoController extends ABaseController<Carrito, ICarritoService> {

      private final ICarritoService carritoService;

    public CarritoController(ICarritoService carritoService) {
        super(carritoService, "Carrito");
        this.carritoService = carritoService;
    }

    @DeleteMapping("/vaciar")
    public ResponseEntity<?> vaciarCarrito() {
        try {
            service.eliminarTodo();
            return ResponseEntity.ok("Carrito vaciado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al vaciar el carrito: " + e.getMessage());
        }
    }
}
