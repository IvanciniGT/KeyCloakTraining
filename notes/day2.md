# HOW do we deal with Authentication & Authorization in Nowadays apps (specially with KeyCloak)
    
                                            SPA
                                            FrontEnd  ---------->   Services
USER                BROWSER                 WEBAPP                  BACKEND                 KEYCLOAK                    WEBSERVER
Marc
1.wants to access   https://webapp.com -----------------------------request--------------------------------------------> Here we have html + JS + CSS
  a webapp                                                                                                               The server certificate                          
                    < ------------------- Make a secure channel ---------------------------------------------------------
Marc is gonna be happy because:
- He knows that the server is actually 
  webapp.com... It's not a fake server
- He knows that that information is 
  gonna be encrypted
                    2. HTML + JS + CSS ---> JS
                    <---------------------- 3. JS is going to generate more HTML
                    4. More HTML
5. He interacts with the HTML ------------> 6. As the user is not authenticated yet...
Maybe he's gonna click somewhere               We need to authenticate the user
which needs Authentication:                    How are we going to do that?
new ________                                   It's gonna be my responsability? NO 
                                               It's KeyCloak Responsability
                                               We are going to redirect the browser to KeyCloak Login page
                                                Bye bye Webapp!!!! No more Web app in the browser running
                    <---------------------- REDIRECT : 3XX
                                                My webapp is going to add to the Keycloak URL a parameter called redirect_url:
                                                    https://webapp.com/new_____
                                                Client_id???? The webapp ID
                    https://mykeycloak.com/.... --------- request --------------------------> 
                                                                                            Checks the ClientId (to make sure is a valid client_id)
                                                                                            Checks the redirect_url is a valid redirection url
                                                                                            Is going to prepare a login form for this user
                    <------------------------------ response (certificate... and a login form)
                    Is going to check the certificate
                    (so Marc is still happy)
                    And is going to display teh login form

Marc is going to fill the form 
And send it back to KeyCloak    -------------------- login informacion: credentials -----> Check credentials
                                                                                           Generate a JWT
                                                                                                What's in here? 
                                                                                                    User ID & Additional Information
                                                                                                    + Expiration 
                                                                                                    + Signature
                                                                                            By the way... KeyCloak is going to Cache this JWT
                                                                                           Redirect to Webapp: redirect_url
                                                                                           Redirect 3XX
                    < ----------------------------response REDIRECT -----------------------
                                                    JWT & Redirect URL
                    https://webapp.com/new_____ -----------------------------------------------------------------------> returns new HTML + JS
                    < -------------------------------------------------------------------------------------------------
                    Displays the HTML 
                    executes JS -----------> Is going to generate more HTML
                                             The JS is going to read the JWT
                                             And..? Is my Webapp going to validate the JWT?
                                             For sure !!!! How?
                                             2 Options:
                                                 1- Just check the JWT contents.
                                                    Check the signature... If the signature is OK, that means?
                                                        - The jwt has been generated by keycloak
                                                        - The information inside the jwt (user id + the additional data) is correct and valid
                                                        - Check expiration
                                                 2- To query KeyCloak 
                                                    Hey KeyCloak... is this JWT "still" valid?
                                                        Am I going to pass my clientSecret To KeyCloak at this point? NO
                                                        Why? The code is running in the browser... And if I have to pass the secret
                                                        that means that the secret is going to be in my code in the browser... so It's not going to be a secret anymore
                                                        I just can't
                                                        
                                                        There is aproblem with this. Can u guess what?
                                                        If anybody steals the JWT, he can ask in behalf of this clientID to KeyCloak whether the JWT is still valid.
                                                        As KeyCloak is not going to Authenticate who is doing the request.
                                                        So... that malicius program knows in advance whether a token is still valid 
                                                        So... that maliciuos program is not going to call my backend with that token if the token is not valid
                                                        So... I'm just giving HINTS to that maliciuos program... TOO BAD.... 
                                                            But... I can not do it better.... SORRY FOR THAT !
                                                    Why would I do this....? I mean... I did already check the contents and the signature and the exppiration date...
                                                    Why then an additional query? 
                                                        Maybe my user did logout already... and Somebody stole the jwt... ups !
                                                    I need to determine whether this is worth it... cause...
                                                        Am I going to be query KeyCloak continuously??? Reeallyy? My app is gonna be slow
                                                                                                                    And I will need to increase my KeyCloack Server budget
                                                        Event though the token could have been invalidated... what is the worst scenerio posible here?
                                                        I'm going to prepare a form ... the user is going to fill it... and the backend is going to REJECT THAT !!!!
                                             Is the JS going to prepare the form for the user?
                                                Depends on what??? Whether the user is Authorized to do this operation?
                                                How does my JS know that the user can do this op? "the additional data" (groups or roles assigned)
                                                
                                                Who does really need to AUTHORIZE THE USER? The backend... It is its responsability
                                                But... Am I going to prepara a form for creating a new ____ to an unauthorized user? NO
                    < ----------------------
                    Display a form 
                        new ____ | CREATE |
                    
Marc 
Interact with the screen...
Maybe there's a new form
He fills that form ------------------------> My JS receives the information... and then?
                                                fetch("https://mybackend/new/____")
                                                ^^^ In the browser library
                                             Sends the information to a BackEnd Services
                                                https://mybackend/new/____
                                                    Authorization: Bearer JWT
                                                    Payload(information)
                                            ----------------------->
                                                                    The backend checks whether the webapp is allowed to contact the backend
                                                                        How this is called? CORS: https://webapp.com/new_____
                                                                    The Backend validates the JWT
                                                                        2 Options:
                                                                         1- Just check the JWT contents. OFFLINE VALIDATION
                                                                            Check the signature... If the signature is OK, that means?
                                                                                - The jwt has been generated by keycloak
                                                                                - The information inside the jwt (user id + the additional data) is correct and valid
                                                                                - Check expiration
                                                                         2- To query KeyCloak . ONLINE VALIDATION
                                                                            Hey KeyCloak... is this JWT "still" valid?
                                                                            Why would I do this....? I mean... I did already check the contents and the signature and the exppiration date...
                                                                            Why then an additional query? 
                                                                                Maybe my user did logout already... and Somebody stole the jwt... ups !
                                                                            --------------->
                                                                                            Who are YOU? 
                                                                                                clientId
                                                                                                clientSecret
                                                                                            KeyCloak is going to authenticate the Back end app...
                                                                                            But... were we doing the same thing with the webapp?
                                                                                                NO... 
                                                                    < --------------------- YES the JWT is valid!
                                                                    Authorization (check the permissions)
                                                                        Who is going to do that?
                                                                        2 OPTIONS:
                                                                        - The backend: by using the User ID 
                                                                                        + the user additional information in the JWT (groups/roles)
                                                                                        + it's own information
                                                                        - Ask KeyCloak... as KeyCloak is also an Authorization System.
                                                                          We can configure "generic" rules in KeyCloak for this.
                                                                          > only users with this role can access to this endpoint
                                                                                                 "admin"            /admin
                                                                            
                                                                            I have never seen nobody using this KeyCloak feature
                                                                            Why? We will see that. It is just like general rule
                                                                                                   But also I will need to define my endpints (resources) in my code 
                                                                                                    and also in KeyCloak... too many places... I want just I SINGLE SOURCE OF TRUTH
                                                                                                 
                                                                    Only in case the User (marc) is authorized 
                                                                    we will process the request

USER                BROWSER                 WEBAPP                  BACKEND                 KEYCLOAK                    WEBSERVER
                                                    
                                                    
In KeyCloak we have defined in advance that an application called: client_id (webapp)
can make redirections to urls such as: https://webapp.com/*
And also, that I'm not going to authenticate queries from this clientId

In KeyCloak we have defined in advance that an application called: client_id (backend)
needs to be authenticated whenever a query is made from this clientId... We will have a bunch of options in order to authenticate the client:
- clientSecret
- IP Address + Certificate ** This is more secure... as the Certificate is hard to be faked... and at certain point the SECRET could have been exposed


KeyCloak is going to store user's password in its database (postgre)

Are those password encrypted in the database?

No... They are Hashed
The actual password is not stored... just a hash of the password.