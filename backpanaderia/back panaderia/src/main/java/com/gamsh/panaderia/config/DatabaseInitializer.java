package com.gamsh.panaderia.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Configuration
public class DatabaseInitializer {

    public DatabaseInitializer(Environment environment) {
    }

    @Bean
    CommandLineRunner initDatabase(DataSource dataSource) {
        return args -> {
            String dbName = "BackPanaderia"; // Cambia aquí el nombre según tu proyecto

            try (Connection connection = dataSource.getConnection();
                    Statement statement = connection.createStatement()) {

                // Verificar si la base de datos ya existe
                String checkDb = "SELECT 1 FROM pg_database WHERE datname = '" + dbName + "';";
                var resultSet = statement.executeQuery(checkDb);

                if (!resultSet.next()) {
                    // Crear la base de datos si no existe
                    statement.executeUpdate("CREATE DATABASE \"" + dbName + "\";");
                    System.out.println("✅ Base de datos creada: " + dbName);
                } else {
                    System.out.println("🔎 La base de datos ya existe: " + dbName);
                }

                // Mostrar la URL pero sin modificar la configuración global
                String newDbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
                System.out.println("🔗 Verifica que la configuración apunte a: " + newDbUrl);

            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("❌ Error al crear o conectar a la base de datos");
            }
        };
    }
}
