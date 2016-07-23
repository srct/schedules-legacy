// Read in excel file
if(typeof require !== 'undefined') XLSX = require('xlsx');
// convert file to workbook
var workbook = XLSX.readFile('classes2016f.xlsx');
// get sheet
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
// convert sheet to JSON
var jsonContents = XLSX.utils.sheet_to_json(worksheet)
console.log("\n *START* \n");
var yr = 2016;
var term_classes = [];
// Loop through al of the different objects parsed by the xlsx to json conversion
for (var i=0; i < jsonContents.length; i++) {
        var currentItem = jsonContents[i];
        // Filter out all of the non-entrys
        if (currentItem['COURSE SECTION'] != 'Total') {
                var c = {};
                c.crn = currentItem['CRN'];
                // skip to next if there is no crn (really only needed for last row)
                  if (!c.crn) { continue; }
                // use last section if blank (for multi-crn sections)
                  if (currentItem['COURSE SECTION']) {
                    var courseNameSection = currentItem['COURSE SECTION'].split(" ");
                  } else {
                    var courseNameSection = jsonContents[i - 1]['COURSE SECTION'].split(" ");
                  }
                c.name = courseNameSection[0] + " " + courseNameSection[1];
                c.title = currentItem['SECTION TITLE'];
                c.section = courseNameSection[2];
                c.campus = currentItem['CAMPUS'];
                // note: the following were in the original to expedite searching
                //c.name_lower = c.name.toLowerCase();
                //c.title_lower = c.title.toLowerCase();
                c.session_templates = [];
                c.notification = 15;
                //c.instructors_lower = '';
                // build session
                var session = {};
                var start = currentItem['START DATE'];
                var end = currentItem['END DATE'];
                session.date_range = start.substring(3, 6) +
                  ' ' +
                  start.substring(0, 2) +
                  ', ' +
                  yr +
                  " - " +
                  end.substring(3, 6) +
                  ' ' +
                  end.substring(0, 2) +
                  ', ' +
                  yr;

                session.days = currentItem['DAYS'];

                if (session.days === '...None') {
                  session.days = '';
                }

                session.time = currentItem['TIMES'];
                if (session.time === ' - ') {
                  session.time = ''
                }

                session.location = currentItem['LOCATION'];
                session.class_type = currentItem['SCHEDULE TYPE'];

                if (currentItem['INSTRUCTOR']) {
                  var instructorsStart = currentItem['INSTRUCTOR'].split(", ");
                  session.instructors = instructorsStart[1] + ' ' + instructorsStart[0];
                }
                else {
                  session.instructors = "unknown";
                }

                // Add an extra space so it doesnt get cut off
                session.instructors = session.instructors + ' ';
                //if (c.instructors_lower) {
                //  c.instructors_lower = c.instructors_lower + ' ' + session.instructors.toLowerCase();
                //} else { c.instructors_lower = session.instructors.toLowerCase() }
                c.session_templates.push(session);

                term_classes.push(c);
            }
    }
var term_classes_json = JSON.stringify(term_classes);

try {
  var result = term_classes_json;
  // write a JSON file.
  var fs = require('fs');
  fs.writeFile('classes2016.json', result, function (err) {
    if (err) return console.log(err);
    console.log('File written to classes2016.json');
  });
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided.
  // Be sure to provide fields if it is possible that your data array will be empty.
  console.error(err);
}
