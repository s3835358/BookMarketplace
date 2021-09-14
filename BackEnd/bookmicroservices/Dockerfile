FROM openjdk:11 as build

EXPOSE 8080

ADD target/bookmicroservices.jar bookmicroservices.jar

ENTRYPOINT [ "java", "-jar", "bookmicroservices.jar" ]


