package com.gamsh.panaderia.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gamsh.panaderia.Dto.ApiResponseDto;
import com.gamsh.panaderia.models.Administrador;
import com.gamsh.panaderia.services.IService.IAdministradorService;
// import com.gamsh.panaderia.utils.ApiResponseDto;
// TODO: Update the import below to the correct package where ApiResponseDto is defined
// Example: import com.gamsh.panaderia.dto.ApiResponseDto;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
@RequestMapping("/api/Administrador")
public class AdministradorController {

    private final IAdministradorService administradorService;

    public AdministradorController(IAdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    // Método de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Administrador admin) {
        if (admin.getCorreo() == null || admin.getContrasena() == null ||
                admin.getCorreo().trim().isEmpty() || admin.getContrasena().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Correo y contraseña son obligatorios.");
        }

        Administrador administrador = administradorService.login(admin.getCorreo(), admin.getContrasena());

        if (administrador != null) {
            administrador.setContrasena(null); // Protege la contraseña
            return ResponseEntity.ok(new ApiResponseDto<Administrador>(
                "Login exitoso",
                administrador,
                true
            ));
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

    // Otros métodos...
}
