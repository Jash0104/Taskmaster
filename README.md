¡Claro! Aquí tienes el README con los comandos de **Prisma** integrados para gestionar tu base de datos de manera sencilla. 🎉

---

# 📋✨ TodoBuster 3000 🚀

¡Bienvenido a **TodoBuster 3000**! La única aplicación que necesitas para capturar, organizar y (¡esperemos!) completar todas esas tareas que rondan en tu mente. ¿Lista de compras? ✔️ ¿Cosas pendientes del trabajo? ✔️ ¿Recordatorio de que tienes que recordar algo? ✔️

TodoBuster 3000 no es solo otra app de "to-dos"... ¡es LA app! Y claro, ¡viene con la magia de Docker y Prisma para que la administración de tu base de datos sea un paseo por el parque! 🐳📊

---

## 🛠️ Instalación y Configuración

### Requisitos Previos

- **Node.js** v14 o superior
- **Docker** y **Docker Compose** (para lanzar tu base de datos como un ninja tecnológico)
- **Prisma** (incluido en el proyecto para que trabajar con la base de datos sea sencillo)
- Un lugar especial en tu corazón para todas las tareas pendientes 🥲

### Primeros Pasos

1. **Clona este repositorio**:

    ```bash
    git clone https://github.com/usuario/todobuster3000.git
    cd todobuster3000
    ```

2. **Instala las dependencias**:

    ```bash
    npm install
    ```

3. **Levanta la base de datos** 🐳:

    ¡Prepárate para dejar que Docker haga la magia!

    ```bash
    docker-compose up -d
    ```

    Este comando ejecuta Docker Compose para lanzar tu contenedor de base de datos en segundo plano. 📂

4. **Configura el entorno**:

   Crea un archivo `.env` basado en el `.env.example` que encuentras en este repo. Asegúrate de incluir la información necesaria para conectar a tu base de datos Dockerizada.

5. **Configura la base de datos con Prisma**:

    Una vez que tengas la base de datos en marcha, ¡es hora de prepararla para almacenar tus "to-dos"!

    - **Genera el cliente Prisma** (si es la primera vez):

      ```bash
      npx prisma generate
      ```

    - **Realiza las migraciones** para que Prisma configure las tablas en la base de datos:

      ```bash
      npx prisma migrate dev --name init
      ```

6. **Ejecuta la aplicación en modo desarrollo**:

    ```bash
    npm run dev
    ```

    Ahora puedes ir a `http://localhost:3000` y admirar tu brillante lista de "to-dos". ¡Completar tareas nunca fue tan divertido!

---

## 🚀 Comandos Útiles

- **`npm run dev`**: Para ver tu aplicación Next.js en acción mientras tú estás en pijama. 👕
- **`docker-compose up -d`**: Levanta la base de datos en segundo plano. ¡Súper útil para evitar distracciones mientras trabajas!
- **`docker-compose down`**: ¿Quieres apagar la base de datos y ahorrarte recursos? Esto es lo que buscas.
- **`npx prisma migrate dev --name <nombre-de-tu-migración>`**: Crea una migración nueva en tu base de datos. ¡Es como crear checkpoints en tu progreso!
- **`npx prisma studio`**: Abre Prisma Studio, una interfaz gráfica para ver y editar los datos en tu base de datos. (¡Perfecto para los visuales! 👀)

---

## 📸 Previsualización

Si estás buscando inspiración, aquí tienes un pequeño adelanto de lo que te espera:

| Lista de "To-dos" | Agrega Tareas | Completa Tareas |
|-------------------|---------------|-----------------|
| ✨  ¡Aquí va la magia!  ✨  | ✅ Todo listo para añadir tus tareas | 🎉 Marca tus éxitos (¡y disfruta ese placer culpable!) |

---

## 🌎 Contribuye a un mundo con menos tareas pendientes

¿Listo para organizar tu vida con TodoBuster 3000? Pues adelante, ¡el mundo de las tareas te espera!