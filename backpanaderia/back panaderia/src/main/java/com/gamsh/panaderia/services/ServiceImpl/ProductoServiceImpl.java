package com.gamsh.panaderia.services.ServiceImpl;

import org.springframework.stereotype.Service;
import com.gamsh.panaderia.models.Producto;
import com.gamsh.panaderia.repositories.IProductoRepository;
import com.gamsh.panaderia.services.IService.IProductoService;

@Service
public class ProductoServiceImpl extends ABaseService<Producto> implements IProductoService {

    private final IProductoRepository productoRepository;

    public ProductoServiceImpl(IProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    protected IProductoRepository getRepository() {
        return productoRepository;
    }
}
