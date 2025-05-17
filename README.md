para construir las imagenes de cada microservicio el broker y el kafka
docker-compose up --build -d

se debe de esperar a que el broker conecte y una vez conectado se deben iniciar los contenedores de cada microservicio

para registrar 

http://localhost:3000/register

{
    "username": "otro",
    "email": "postman@example.com"
}
![image](https://github.com/user-attachments/assets/dbd27047-eaaf-4fbb-8099-69d1d77561b7)

para buscar 

http://localhost:3000/users/ID_GENERADO EL EL LOG 

![image](https://github.com/user-attachments/assets/7565aae7-d552-46b8-8752-164f56361da6)

SE ven los logs en consola 

![image](https://github.com/user-attachments/assets/cb8d25ca-c5d7-44c4-bc8e-5df511ec20c1)

