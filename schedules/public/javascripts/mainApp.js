var slugs;
$(document).ready(function() {
    $('#classSearch').DataTable();

    var schoolSelect = document.getElementById('selectSchool');
    $.getJSON('/api/v1/json/schools', function(schoolSlugs) {
      var slugs = schoolSlugs;
      for (i = 0; i < schoolSlugs.schools.length; i++) {
        schoolName = schoolSlugs[schoolSlugs.schools[i]];
        schoolSelect.add(new Option(schoolName.longName, i + 1));
      }
    });
} );
