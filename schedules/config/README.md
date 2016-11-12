# Schedules

*By Mason SRCT*

## Configuration Directory

The configuration of this application is managed by
[node-config](https://github.com/lorenwest/node-config). This allows for
environment based configuration that uses an override schema instead of fresh
sets of configs for each environment we want to run. Look at the docs for that
node module to really get a good idea of what is going on, but what follows is
a general description of what is in this foldler.

### Structure

#### default.yaml

This file holds all of the standard values that are suitible for a development
environment. Everything that needs to be configured should be set up here first
unless it is only applicable to a production environment.

#### test.yaml

This file holds special overrides for the testing environment.

Notably, the main set of configuration here is that it instructs sequelize to
use RAM to store the sqlite database.

#### production.yaml

This file holds the overrides for a production environment.

Anything that is specific to a particular deployment should use null values
in this file. These should be overriden in a `local-production.yaml` file which
is **not** tracked by git.

#### local-production.yaml.example

This is the example local production file that needs to be copied, renamed to
`local-production.yaml` and have it's contents filled out for a production
deployment. For normal development, this file is pretty irrelevant.

For more information on deployment, see the deployment section of the docs.
(You'll also have to wait for the app to be finished before that's even an
issue).
