package com.gamsh.panaderia.repositories;

import com.gamsh.panaderia.models.Factura;

import org.springframework.stereotype.Repository;

@Repository
public interface IFacturaRepository extends IBaseRepository<Factura, Long> {
    
}

