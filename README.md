# SCHEDULES

Schedules is a web app that allows students to import their class schedules
into popular calendar managers. Uses webDAV.

## On Contributing

Schedules welcomes all the help it can get, and is currently in opening
stages. Join the #schedules slack channel to get involved.

There are many things that can be done with this project (see the "To Do"
section), but sometimes it's the small things that count, so don't be afraid
of contributing just a small spelling mistake.

If you need help at all please contact a SRCT member. We want people to
contribute, so if you are struggling, or just want to learn we are more than
willing to help.

The project manager for this project is [Mark Stenglein](mstengle@gmu.edu),
and a lead developer is [David Haynes](dhaynes3@gmu.edu).

Please visit the [SRCT Wiki](http://wiki.srct.gmu.edu/) for more information on
this and other SRCT projects, along with other helpful links and tutorials.

## Setting up the Development Environment

### nvm

First install [nvm](https://github.com/creationix/nvm), which allows for node
version management:

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`

Next, you will need to install node through nvm (this simplifies the
instructions by making them relatively platform independent).

`nvm install node`

### sqlite

You will need to install sqlite3. How this is done is dependent on your system
but for `apt` systems this is as simple as:

`sudo apt install sqlite3`

A note: This project uses MySQL in deployment, but don't worry about that just
yet.

### Project Dependencies

Simply navigate to the root directory and type `npm install`, and you should
be good to go from there.

Test your installation by running `npm start` and the application should spin
up.

## Deployment


## To-do

The list of to-do items is kept track of on the gitlab Scheduels issues page. https://git.gmu.edu/srct/schedules/issues

Each issue includes details about the bugs and features, and links to documentation and tutorials to help with fixing that specific issue.

Contact the project manager or any of its developers if you'd like help picking an unassigned issue.

## About Mason SRCT

**S**tudent - **R**un **C**omputing and **T**echnology (*SRCT*, pronounced "circuit") is a student organization at George Mason University which enhances student computing at Mason. SRCT establishes and maintains systems which provide specific services for Mason's community.

---

### Credit where due:
[Calendar](https://thenounproject.com/search/?q=calendar&i=431010) icon by Guilhem from [the Noun Project](https://thenounproject.com)

## Project Structure

The project has been setup in such a way as to try and not be confusing. Here
is a brief overview of where everything is and what each section does.

```plaintext
schedules/
  config/
    default.yaml
    production.yaml
    local-*.yaml
  data/
    index.js
    dataFiles/
      *.min.json
  helpers/
    dataScrapers/
      GMU/
        archivedJSON/
          *.json
          *.min.json
        archivedXLSX/
          *.xlsx
        classes.sh
        extractClasses.js
  models/
    index.js
    Section.js
    Semester.js
    University.js
  public/
    fonts/
      bootstrap/
    images/
    javascripts/
      bootstrap/
      mainApp.js
    stylesheets/
      bootstrap/
      main.css
  routes/
    api/
      v1.js
    docs.js
    index.js
  tests/
    routes/
    models/
    integration/
    ui/
  views/
    index.pug
    *.pug
  app.js
  LICENSE
  package.json
  README.md
```
