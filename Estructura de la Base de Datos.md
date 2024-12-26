### 1. Tabla  usuarios

```sql
CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
correo VARCHAR(255) UNIQUE NOT NULL,
contraseña VARCHAR(255) NOT NULL,
rol VARCHAR(50) CHECK (rol IN ('Administrador', 'Registrado', 'No registrado')),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Tabla posteos

```sql
CREATE TABLE posteos (     
id SERIAL PRIMARY KEY,
titulo VARCHAR(255) NOT NULL,
texto TEXT NOT NULL,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
tipo VARCHAR(50) CHECK (tipo IN ('Publico', 'Privado')),
usuario_id INT NOT NULL REFERENCES usuarios(id),
url_archivo VARCHAR(255),
enlaces_externos TEXT 
);
```


### 3. Tabla  archivos


```sql
CREATE TABLE archivos (     
id SERIAL PRIMARY KEY,
post_id INT NOT NULL REFERENCES posteos(id),
url VARCHAR(255) NOT NULL,
tipo VARCHAR(50) CHECK (tipo IN ('imagen', 'pdf')) 
);
```

### 4. Tabla  comentarios


```sql
CREATE TABLE comentarios (     
id SERIAL PRIMARY KEY,
post_id INT NOT NULL REFERENCES posteos(id),
usuario_id INT NOT NULL REFERENCES usuarios(id),
texto TEXT NOT NULL,
fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
```


### 5. Tabla  calificaciones_posteos


```sql
CREATE TABLE calificaciones_posteos (     
id SERIAL PRIMARY KEY,
post_id INT NOT NULL REFERENCES posteos(id),
usuario_id INT NOT NULL REFERENCES usuarios(id),
estrellas INT CHECK (estrellas >= 1 AND estrellas <= 5),
like_dislike BOOLEAN, -- TRUE para like, FALSE para dislike
CONSTRAINT unica_calificacion UNIQUE (usuario_id, post_id) 
);
```
`

### 6. Tabla  calificaciones_comentarios

```sql
CREATE TABLE calificaciones_comentarios (     
id SERIAL PRIMARY KEY,
comentario_id INT NOT NULL REFERENCES comentarios(id),
usuario_id INT NOT NULL REFERENCES usuarios(id),
estrellas INT CHECK (estrellas >= 1 AND estrellas <= 5),
like_dislike BOOLEAN, -- TRUE para like, FALSE para dislike
CONSTRAINT unica_calificacion_comentario UNIQUE (usuario_id, comentario_id) 
);
```


### **Validaciones y Restricciones**

- **Unicidad**:
    
    - Un usuario solo puede calificar una vez un post o un comentario, gracias a las restricciones `UNIQUE` en las tablas `calificaciones_posteos` y `calificaciones_comentarios`.
- **Integridad referencial**:
    
    - Todas las claves foráneas (`FK`) están definidas con referencias explícitas a las tablas relacionadas.
- **Control de tipos**:
    
    - Las columnas `tipo` en las tablas `posteos` y `archivos` limitan los valores permitidos.


---
[[Proyecto Blog 2024-diciembre-26]]