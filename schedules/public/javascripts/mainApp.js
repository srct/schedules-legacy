// Expose the school data globally.
var schoolData = {};
// Expose the semester data globally
var semesterData = {};

$(document).ready(function() {
    // Convert table to DataTable
    $('#classSearch').DataTable();

    // Get schoolData and populate the selection menus
    $.getJSON('/api/v1/json/schools', function(schoolSlugs) {
      semesterData = schoolSlugs;
      populateBoxes();
    });

    $('#selectSchool').change(function() {
      populateSemesterSelect();
    });
} );

function populateBoxes() {
  var schoolSelect = document.getElementById('selectSchool');

  for (i = 0; i < semesterData.schools.length; i++) {
    var schoolName = semesterData[semesterData.schools[i]];
    schoolSelect.add(new Option(schoolName.longName, i));
  }

  populateSemesterSelect();
}

function populateSemesterSelect() {
  var schoolSelect = $('#selectSchool');
  var selectSemester = document.getElementById('selectSemester');

  // Clear Select Semester
  selectSemester.innerHTML = "";

  var schoolID = $('#selectSchool option:selected').val();
  var schoolSlug = semesterData.schools[schoolID];
  var school = semesterData[schoolSlug];

  for (i = 0; i < school.semesters.length; i++) {
    var semesterName = school.semesters[i];
    selectSemester.add(new Option(semesterName.longName, i));
  }
}
