# Schedules

*By Mason SRCT*

## Configuration Directory

This directory houses all of the various configuration files for the different
modules and sections of the web application. Each file houses a specific set of
settings that is documented here in this `README`.

### schoolSemesters.json

This file stores the names and slugs of all the different schools, semesters,
and data files to be loaded by the database on startup. It is structured as
shown below:

#### Structure

```json

{
    // Starts with an array containing the different school slugs, which will
    //   be used to construct the api section of the application.
    "schools": [
        "SLUG",
        ...
    ]

    // Moves on to one object for each individual school, using the given slug
    //   as the object name (the application uses the array above to reverence
    //   these objects).
    "SLUG" : {
        "longName" : "A Fantastic University",
        "semesters" : [
            {
                "slug" : "SLUGYEAR{SP, S, F}",
                "longName" : "{Spring, Summer, Fall} YEAR"
            },
            ...
        ]
    },
    ...,

    // Finally defines the names of the datafiles that need to be loaded. The
    //   SLUG values inside need to match up with those defined in this file,
    //   or they will be rejected.
    "dataFiles" : [
        "SLUGYEAR{SP, S, F}.min.json",
        ...
    ]
}

```

### sequelize.json

This file stores the configuration settings for the database used by the
application. This file is a bit special because it stores sepeparate configs
for each different environment (dev, testing, and production).

The structure is defined below:

#### Structure

```json

{
    // settings for development
    "development" : {
        // uses sqlite for local development, because it's easy.
        "dialect" : "sqlite",

        // storage location for the local database. Should be an actual
        //   file so that it is easy to debug any issues with the db manually
        "storage" : "./db.development.sqlite"
    },

    // settings for testing (via gitlab CI, jenkins, Travis CI, etc)
    "test" : {
        // uses sqlite for the same reason as the dev environment
        "dialect" : "sqlite",

        // uses memory, because it's easy. This might become the norm for both
        "storage" : ":memory:"
    },

    // production settings. In the repo, this file is going to stay as is.
    //   DO NOT CHANGE THIS FILE TO REAL VALUES. In fact, best to just leave
    //   this file to your sysadmin (unless that's you, of course).
    "production" : {
        // database username
        "username" : "schedules",

        // database user password
        "password" : "srct",

        // database name
        "database" : "schedules",

        // database host
        "host" : "localhost",

        // uses mysql because ??? (not sure if this is the final thing to use)
        "dialect" : "mysql",

        // use a pool of connection clients to keep the site able to handle
        //   large amounts of traffic to the api.
        "pool" : {
            "max" : 5,
            "min" : 0,
            "idle" : 10000
        }
    }
}

```

### siteInfo.json

This file stores information about the site deployment. In general, this can
stay untouched in version control unless additional variables need to be
tracked. Most of these are going to be branding variables, etc.

Again, the structure is defined below:

#### Structure

```json

{
    // Name of the web app (shows on the main page??)
    "name" : "Schedules",

    // Description of the app (shows to google etc in the metadata for the
    //   page)
    "description" : "A simple application to add your class schedules to calendar applications.",

    // Information about the deploying organization (this is the main branding
    //   section)
    "organization" : {
        // Name of the deploying org
        "name" : "Mason SRCT",

        // Longer name of the deploying org
        "description": "Student Run Computing and Technology",

        // Website text and full URL of the deploying org
        "website"    : "srct.gmu.edu",
        "websiteURL" : "https://srct.gmu.edu"
    }
}

```
