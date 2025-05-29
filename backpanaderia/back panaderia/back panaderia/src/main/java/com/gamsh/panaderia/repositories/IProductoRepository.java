package com.gamsh.panaderia.repositories;

import org.springframework.stereotype.Repository;

import com.gamsh.panaderia.models.Producto;

@Repository
public interface IProductoRepository extends IBaseRepository<Producto, Long> {
    // Puedes agregar métodos como findByNombre(String nombre) si es necesario
}
