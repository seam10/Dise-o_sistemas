package com.gamsh.panaderia.repositories;


import org.springframework.stereotype.Repository;
import com.gamsh.panaderia.models.Administrador;

@Repository
public interface IAdministradorRepository extends IBaseRepository<Administrador, Long> {
    Administrador findByCorreo(String correo);
}
