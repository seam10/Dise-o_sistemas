package com.gamsh.panaderia.repositories;

import org.springframework.stereotype.Repository;
import com.gamsh.panaderia.models.Inventario;

@Repository
public interface IInventarioRepository extends IBaseRepository<Inventario, Long> {
   // Inventario findByProductoId(Long productoId);
}
