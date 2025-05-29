package com.gamsh.panaderia.repositories;
import com.gamsh.panaderia.models.Carrito;
import org.springframework.stereotype.Repository;

@Repository
public interface ICarritoRepository extends IBaseRepository<Carrito, Long> {
    // Aquí puedes poner métodos como findByFacturaId(Long id), etc.
}

