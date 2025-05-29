package com.gamsh.panaderia.services.ServiceImpl;

import org.springframework.stereotype.Service;
import com.gamsh.panaderia.models.Factura;
import com.gamsh.panaderia.repositories.IFacturaRepository;
import com.gamsh.panaderia.services.IService.IFacturaService;

@Service
public class FacturaServiceImpl extends ABaseService<Factura> implements IFacturaService {

    private final IFacturaRepository facturaRepository;

    public FacturaServiceImpl(IFacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    @Override
    protected IFacturaRepository getRepository() {
        return facturaRepository;
    }
}
