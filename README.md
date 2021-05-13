- [ ] Hacer un login para usuario, ya sea con email username, como prefieras. Habilitar
      un usuario default y aclarar en el repositorio las credenciales para logearse.

Manejar formularios con: https://react-hook-form.com/

Validación: https://react-hook-form.com/get-started#SchemaValidation

Mock Axios: https://www.npmjs.com/package/axios-mock-adapter

(Muy Opcional): https://blog.bitsrc.io/how-to-start-using-react-query-4869e3d5680d

Lógica Login:

Para el login hacemos un POST (mockeado con axios-mock-adapter)
Nos devuelve un JWT en el payload (respuestA)
Guardamos este JWT en localStorage
Y lo enviamos por Header en cada request al front
Re-direcionar
