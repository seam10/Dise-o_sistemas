package com.gamsh.panaderia.services.ServiceImpl;


import org.springframework.stereotype.Service;
import com.gamsh.panaderia.models.Inventario;
import com.gamsh.panaderia.repositories.IInventarioRepository;
import com.gamsh.panaderia.services.IService.IInventarioService;

@Service
public class InventarioServiceImpl extends ABaseService<Inventario> implements IInventarioService {

    private final IInventarioRepository inventarioRepository;

    public InventarioServiceImpl(IInventarioRepository inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }

    @Override
    protected IInventarioRepository getRepository() {
        return inventarioRepository;
    }

   // @Override
   // public Inventario obtenerPorProducto(Long productoId) throws Exception {
   //     return inventarioRepository.findByProductoId(productoId);
  //  }
}