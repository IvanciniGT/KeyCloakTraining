KeyCloak



FrontEnd JS React           Offline token validation.... Performance

Backend REST API            Online token validation
    JAVA - SpringBoot       ^^
                ^^ Automatically

JAVA Software runs inside a Virtual Machine

Who is going to talk (make a request) to keycloak?
Browser & Backend
^^^
https://IP:8443 ?? PROBLEM ? Certificate is self signed.... the browser rejects the certificate (Just type thisisunsafe) 
The backend is going to have that problem too!
And we cannot type thisisunsafe in the backend...

We need to export the KeyCloak Certificate
And we have to register that certificate as a valid one

The keystore is a vault which contains the certificate.
It is actually encrypted inside the vault.

A keystore may contain a bunch of certificates
Each certificate is identified by an alias

We need to add this certificate not to our host... but to the virtual machine

# Coping the keystore file where we have generated the server certificate while creating the docker image
docker cp mykeycloak1:/opt/keycloak/conf/server.keystore .

# We extract the certificate from that keystore
keytool -exportcert -rfc -alias server -keystore server.keystore -file myserver.crt

# We import the certificate in the jvm keystore where the backend is going to be running
sudo keytool -importcert -file myserver.crt -noprompt -alias certificate_alias -keystore /usr/lib/jvm/java-11-openjdk-amd64/lib/security/cacerts -storepass changeit  

maven is a tool that we use in the JAVA WORLD which help us:
- to manage dependencies                                            nuget
- to compile, package, test the software                            msbuild dotnet

In maven each ARTIFACT (library) is Identified by:
- ArtifactID        Is an ID identifing an artifact within a GroupId            mybackend
- GroupId                                                                       com.mycompany
- Version                                                                       1.0.0