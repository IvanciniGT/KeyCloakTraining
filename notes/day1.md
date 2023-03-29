
# KeyCloak?

Authentication and Identity Manager

This is useful for....
- Identification            To retrieve information abour a user/account
- Authentication            To probe the identity id a subject, to make sure that the subject is who it claims to be
- Authorization             To determine which actions are allowed for an authenticated subject... but also to determine on which elements can these actions be applied

Who is behind KeyCloak? Which company? Redhat Inc.

Which tools do you know from Redhat?

  OpenSource & Paid Products                    OpenSource & Free = FreeSoftware
- Openshift Container Platform <-- upstream --      OKD
- RHEL                                              Fedora
- JBoss                                             wildfly
- Redhat Single Sign On                             KeyCloak
- Ansible engine                                    Ansible project
- Ansible Tower                                     Ansible AWX

^ Do we pay for the features? NOT REALLY
  We just pay for the support

# Opensource

The source is open so that everybody can see it.... Can they change it? Depending on the license

# KeyCloak Features

- Identity Provider.... Is kind a User's database
- It allow to configure several sources of information:                         User Federation
  - Keycloak can use its own database to store User's information
  - But also, my user's information can be stored in an LDAP Directory / Microsoft Active Directory
- Allow to Authentica users... but it can make also use of:                     Identity broker
  - It's own mechanisms of validation...
  - It can rely on 3rd party systems to authenticate users: Github, Facebook, Google Accounts,...
- Keycloak provides Single Sign On: We can access multiple applications by just login in once, in KeyCloak
- Keycloak is a production ready software
- Keycloak is multitenant. With 1 single installation and execution of the software we can provide service to multiple tenants(clients)
                           Each is going to have it's own information isolated ----> REALM

    REALM? It is an isolated environment where we can store a tenant related information (users, applications, roles...)

By default, In Keycloak we will have the MASTER REALM... where the KeyCloak admin user is stored.
We will keep this real for this single user.

## Production environments

- High Availability
  "TRY" to achieve a service time 
  "TRY" to avoid data lost
- Escalability
  Increase by also decrease the infra... to match the actual needs

We usually achieve those things by using CLUSTERS (active/pasive-active/active)


---

# Identification

Is it enough to say my name is Ivan Osuna ! and my ID is 19238347

# Authentication

- Biometric check. Check if a person matches a pic in the ID
                   A phone does the same thing with a pic/video/fingerprint
- A 3rd party. Maybe you trust a person... and if that person says that I'm Ivan, then you have no worries to accept that I'm actually Ivan
- If I probe that I know something that you know also, and that you know that I know. And that I'm the only one who knows that.
  PASSWORD 

Humans use ID cards. Do we trust in ID Cards? In general?
We don't trust in ID cards in general... We trust in the ID card supplier!

What is the equivalent of an ID Card in the computers world? Certificate

What is inside a Certificate... and what a certificate is used for?

Nowadays one of the most popular communication protocols is HTTP...
but instead of http, we tend to use httpS

Where the S comes from ?

TLS: What is this useful for? To use a certificate in httpS
That TLS layer allows us to avoid 2 different attacks
- Man in the middle
    ENCRIPTION
- Phishing : When someone says that is a server which is not.
    

There is no way to prevent those attacks... We can just frustrate them.


# ENCRIPTION

IS JUST A FUNCTION WHICH allos us to pass from a textA to a textB which are completely different, by using a KEY.

# DENCRIPTION

IS JUST A FUNCTION WHICH allos us to pass from a textB to a textA which are completely different, by using a KEY.

We have 2 different encription algorythms:
- Symetric: The key used for encription is the same that we use for de-encription
- Asymetric: The key that we uso for encryption is different than the one that we use for de-encryption
             But those 2 keys, are related. For each encryption key we have just 1 valid de-encryption key

Which one is considered more secure? 
Asymetric. Why? One of the keys is never shared... so nobody can steal
The problem with asymetric keys is that at certain point they need to be shared... and at that point, they can be stolen

In https, which kind of algorythm do we use?
The main part of the communication is done by using symetric algorithms
But the symetric key is shared bu using an asymetric algorithm

Symetric algorythms performs better than Asymetric ones.

# Certificates

What's inside a Certificate?

- My identity data (distinguised name)
- Expliration date
- My public key
-------
- Issuer data: Who is signing this certificate
- A signature

How can I make use of that information to authenticate a subject?

How is it generated. A Signature???

We get all that information and we create a hash.
And ... what do we do with the hash? We encrypt that has by using the private Key of the Certificate Issuer
And that is what we call a signature

# What is a hash,... or a hashing algorithm?

A function which takes a textA and generates a data.
But I'm sure that the same INPUT is always associated with the same OUTPUT
If I have the OUTPUT can I regenerate the original information? NO
Can 2 different INPUTS generate the same OUTPUT? YES

In Spain each 24 ID numbers, the hash is repeated. But I'm "sure" 95.6% that a ID is ok if the char matches the number.

HAshing algorythms has what we call a collition percentage.

Which hashing algorythms dow you know?
- MD5
- SHA-512
- SHA-2048 √ 

In compùters these algorythms generates a secuence of bytes


# All this security world is about TRUSTING and CONFIDENCE!!!

Imagine I have a watch... an expensive watch.
And I have that watch on my bed table... on top...

If I trust the main door... or my cleaning stuff...
and If I not? Or I can store that watch inside a safe...

But are you happy with that? 
Maybe... maybe not? That depends on me... and how paranoid am I... that's it...
I mean... I can think... Well my cleaning stuff in not going to be able to open the safe...
But somebody can come into my house an open the safe.

I'm going to get a much more safer safe... but maybe I'm extremely pranoid.... and think... they can just take the safe with them

So... I say... I'm going to Weld tghe safe to my house structure

# BASE64

It is an ENCODING

Other encodings? UTF-8, ASCII, ISO-5889-1

What the thing with this base64 encoding.?

The point here is that we can encode which ever text,
it doesn't matter the chars that it includes by using just raw ascii chars

# JWT

Javascript Web Tokens

And... what is that?

Information (Identification info? YES... + additional info) which travel signed... 
And also... do that jwt contains an expiration date? 
by using a private Key of a trusted subject.

It is kind the sema as a certificate.

What will we be able to do with that JWT?
Autenticate a subject

What kind of subjects are we going to authentica by using JWT? People, Applications, Devices....

Who is going to generate thos tokens? Authorization server : SUCH AS KEYCLOAK

SPY
                              JS
USER        BROWSER         WEBAPP          BACKEND         KEYCLOAK            WEBSERVER











# Do we store passwords encripted within a database






- Authorization