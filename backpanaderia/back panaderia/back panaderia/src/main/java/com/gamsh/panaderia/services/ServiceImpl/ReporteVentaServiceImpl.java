package com.gamsh.panaderia.services.ServiceImpl;


import org.springframework.stereotype.Service;
import com.gamsh.panaderia.models.ReporteVenta;
import com.gamsh.panaderia.repositories.IReporteVentaRepository;
import com.gamsh.panaderia.services.IService.IReporteVentaService;


@Service
public class ReporteVentaServiceImpl extends ABaseService<ReporteVenta> implements IReporteVentaService {

    private final IReporteVentaRepository reporte_VentaRepository;

    public ReporteVentaServiceImpl(IReporteVentaRepository reporte_VentaRepository) {
        this.reporte_VentaRepository = reporte_VentaRepository;
    }

    @Override
    protected IReporteVentaRepository getRepository() {
        return reporte_VentaRepository;
    }
}
