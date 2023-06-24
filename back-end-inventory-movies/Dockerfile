#Imagen de Maven para poder realizar el build del proyecto
FROM maven:3.8.5-openjdk-17 AS build
#Se copia todo el proyecto
COPY . .
#Se ejecuta el comando para que genere el JAR
RUN mvn clean package -DskipTests


#Imagen de Java de DockerHub
FROM openjdk:17-alpine
#Directorio Raiz
WORKDIR /app

#Exponemos el puerto con el que se va a encontrar
EXPOSE 8081

#Copiamos el jar a la raiz para que el ENTRYPOINT lo tome de la raiz
COPY --from=build /target/back-end-inventory-movies-0.0.1-SNAPSHOT.jar .

#Punto de entrada, comando separado para levantar el proyecto con el jar en el WORKDIR
ENTRYPOINT ["java", "-jar", "back-end-inventory-movies-0.0.1-SNAPSHOT.jar"]
