FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY backend .
RUN mvn clean package -DskipTests

FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend .
RUN npm ci && npm run build

FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]