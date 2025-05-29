package com.gamsh.panaderia.services.IService;

import com.gamsh.panaderia.models.Administrador;

public interface IAdministradorService {
    Administrador login(String correo, String contrasena);
    // Otros métodos...
}
