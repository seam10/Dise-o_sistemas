package com.gamsh.panaderia.controllers;

import org.springframework.web.bind.annotation.*;
import com.gamsh.panaderia.models.Producto;
import com.gamsh.panaderia.services.IService.IProductoService;


@CrossOrigin(origins = "http://localhost:8100")
@RestController
@RequestMapping("/api/productos")
public class ProductoController extends ABaseController<Producto, IProductoService> {

    private final IProductoService productoService;

    public ProductoController(IProductoService productoService) {
        super(productoService, "Producto");
        this.productoService = productoService;
    }

    // Métodos personalizados si los necesitas
}
