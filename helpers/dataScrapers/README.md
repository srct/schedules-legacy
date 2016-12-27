# Data Scrapers

This directory houses the different scrapers that are used to generate the
various .json files that are loaded into the database on startup. Each scraper
is documented below:

## Scrapers

### George Mason University (GMU)

George Mason University does not provide a public endpoint for us to source data
from. Instead we will be downloading a report from the database server that has
all of the courses in the schools history. This report is an XLSX file, and can
be simply converted into the .json format by using the included script.

#### To Download the XLSX File

1. Go to the [MicroStrategy site](https://inveniopws.gmu.edu:8250/MicroStrategy/servlet/mstrWeb)
and sign in as a "Guest User."

2. Click on `GMU Public Reports` > `Shared Reports` > `Course Enrollment` > `Course Search - All Sections`.
   To do this right, you will need to make sure you click on `Export` when you mouse over Course Search.

3. Select the semester that you want and click on the arrow to bring it into your query.

3. Click `Export` (in the lower left hand corner).
