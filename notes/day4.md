# POSIX FOLDERS

/
    bin/
    opt/            **** 
    usr/
    etc/
    var/
    tmp/
    home/
    dev/


We want 2 instances to achieve HIGH AVAILABILITY.

Machine 1   
    KeyCloak Instance 1 (IP1)     <<< OFF LINE!!!                                              Client (app/user)
        TOKEN_FOR_USER_1                LoadBalancer (IP_LB)                                      IP_LB >>> TOKEN_FOR_USER_1
Machine 2                                   Sticky sessions
    KeyCloak Instance 2 (IP2)     <<<
        Is out user's token in this instance cache?
            - It should
            - Keycloak uses a distributed cache: INFINISPAN

Why does Keycloak stores each Token??
- Validation... 
- Each token contains an expiration date... but a user can logout before that expiration date...
- And once a user logout, the token is invalidated
- Keycloak stores those tokens to be able to validate VALID ones
Where are those tokens stored?
- In postgreSQL
- In the KeyCloak chache
 
# MOVE A THEME FOR PRODUTION

1. Compress the themes folders into a zip file...
2. Change the extension of that zip file to .jar
---> As an alternative, we could configure a mvn project... Add those themes directories into the:
        src/main/resources folder
        And execute a mvn package... taht would generate the .jar file for us.

3. When creating out custom image, we should copy that jar file into /opt/keycloak/providers
4. We should execute kc.sh build command, so that Keycloak starts using this theme               !IMPORTANT

By doing these steps, KEycloak is going to get pre-configured, so each time
a new container is created from this image, its going to have availale my new themes, automatically
But also, they are going to be cached... So keycloak is goign to start inmmediately

If we leave the themes into the themes folder, KEycloak would need to scan for them... 
This process takes up to 20-30 seconds... THAT IS NOT GOOD IN A PRODUCTION ENVIRONMENT
There is no point in doing that