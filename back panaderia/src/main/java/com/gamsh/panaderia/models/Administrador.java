package com.gamsh.panaderia.models;

import jakarta.persistence.*;

@Entity
@Table(name = "administrador")
public class Administrador extends ABaseEntity {

    @Column(nullable = false, length = 100, unique = true)
    private String correo;

    @Column(nullable = false, length = 100)
    private String contrasena;

    public Administrador() {
        this.setStatus(true);
    }

    // Getters y Setters

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
