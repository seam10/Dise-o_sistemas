package com.gamsh.panaderia.services.IService;
import com.gamsh.panaderia.models.Carrito;


public interface ICarritoService extends IBaseService<Carrito> {
    void eliminarTodo() throws Exception;
}


