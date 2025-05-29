package com.gamsh.panaderia.services.IService;

import com.gamsh.panaderia.models.Inventario;

public interface IInventarioService extends IBaseService<Inventario> {
    Inventario obtenerPorProducto(Long productoId) throws Exception;
}
