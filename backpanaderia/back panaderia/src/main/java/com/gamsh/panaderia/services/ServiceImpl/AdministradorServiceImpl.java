package com.gamsh.panaderia.services.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gamsh.panaderia.models.Administrador;
import com.gamsh.panaderia.repositories.IAdministradorRepository;
import com.gamsh.panaderia.services.IService.IAdministradorService;

@Service
public class AdministradorServiceImpl implements IAdministradorService {

    private final IAdministradorRepository administradorRepository;

    @Autowired
    public AdministradorServiceImpl(IAdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    @Override
    public Administrador login(String correo, String contrasena) {
        // Buscar el administrador por correo
        Administrador admin = administradorRepository.findByCorreo(correo);
        
        // Validar si las credenciales son correctas
        if (admin != null && admin.getContrasena().equals(contrasena)) {
            return admin; // Retorna el administrador si la contraseña es correcta
        }

        return null; // Si no es válido, retorna null
    }

    // Otros métodos de servicio...
}
