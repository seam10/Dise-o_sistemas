package com.gamsh.panaderia.services.ServiceImpl;

import com.gamsh.panaderia.models.Carrito;
import com.gamsh.panaderia.repositories.ICarritoRepository;
import com.gamsh.panaderia.services.IService.ICarritoService;
import org.springframework.stereotype.Service;

@Service
public class CarritoServiceImpl extends ABaseService<Carrito> implements ICarritoService {

    private final ICarritoRepository carritoRepository;

    public CarritoServiceImpl(ICarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    @Override
    protected ICarritoRepository getRepository() {
        return carritoRepository;
    }

    @Override
    public void eliminarTodo() throws Exception {
        carritoRepository.deleteAll();
    }

    // Aquí puedes agregar métodos personalizados si necesitas más
}
