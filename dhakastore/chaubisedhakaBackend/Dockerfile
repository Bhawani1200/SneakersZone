# # Stage 1:Download the dependencies
# FROM intellij:openjdk:23 AS dependencies
# RUN APK add --no--cache maven
# WORKDIR  /build
# COPY pom.xml .
# RUN mvn dependency:go-offline
#
# # Stage 2:Build the dependencies
# FROM dependencies as builder
# COPY src  ./src
# RUN mvn clean package -DskipTests
#
# # Stage 3:Run the application
# FROM intellij:jre-23 AS runtime
# WORKDIR /app
# COPY --from:builder /builder/target/*.jar app.jar
#
# ENTRYPOINT ["jar","-jar","app.jar"]

# Stage 1: Build the application


# FROM maven:3.9.9-eclipse-temurin-24 AS builder
#
# WORKDIR /build
#
# COPY pom.xml .
# RUN mvn dependency:go-offline
#
# COPY src ./src
#
# RUN mvn clean package -DskipTests


# Stage 2: Run the application
# FROM eclipse-temurin:24-jre
#
# WORKDIR /app
#
# COPY --from=builder /build/target/chaubisedhakaBackend-0.0.1-SNAPSHOT.jar app.jar
#
# EXPOSE 8080
#
# ENTRYPOINT ["java", "-jar", "app.jar"]

# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the JAR file from builder stage (adjust the name as needed)
COPY --from=builder /build/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]