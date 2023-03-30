# Client

A client is just an app that is going to use KeyCloak in order to authenticate users.

A client is gonna have its own clientId
A client may have a secret... Just in case we require Keycloak to authenticate the client


Whenever a client request Keycloak to authenticate a user,
Key cloak is goign to present a form to that user...
and is going to ask that user: ARE YOU OK WITH THIS???
Do you want that app to be able to access your data?

Which data is the client going to be able to access?
Every single data in Keycloak's database?
Not really.

By default we will configure the client to be able to access only to a set of the fields that we have.
And keycloak will present to the user a form to agree in those fields .

But... and app(client) can define scopes!

Imagine I am developing an app for share documents between users.
Whenever a document is shared the app is going to send an email or a sms text message to the mobile

For doing this, the app needs to access the phone.
We could have a bunch of other features that doesn't require the phone... nut that op requires the mobile.
So at that time, the app can ask for that info (I need the phone) to KeyCloak.
And then Keycloak is goijng to present the user a new form... asking for aggreement
Do you want me to share your hone with this app?

This is what we define in a SCOPE !

Each client (app) is going to have a set of default scopes... but at certain point they can ask for more scopes !