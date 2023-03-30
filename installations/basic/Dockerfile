FROM quay.io/keycloak/keycloak:21.0 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

WORKDIR /opt/keycloak

ENV KC_HOSTNAME=34.254.191.234
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:$KC_HOSTNAME" -keystore conf/server.keystore

ENV KC_DB=postgres
RUN /opt/keycloak/bin/kc.sh build       


#######


FROM quay.io/keycloak/keycloak:21.0
COPY --from=builder /opt/keycloak/ /opt/keycloak/
ENV KC_DB=postgres
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
