package com.gamsh.panaderia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gamsh.panaderia.models.ABaseEntity;

public interface IBaseRepository<T extends ABaseEntity, ID> extends JpaRepository<T,ID> {
}
