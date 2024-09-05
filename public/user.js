$(document).ready(function() {
    // Fetch user data from the server
    $.ajax({
        url: '/users',
        method: 'GET',
        success: function(response) {
            var users = response.data;
            var usersTableBody = $('#usersTable tbody');
  
            // Populate the table
            users.forEach(function(user) {
                var row = $('<tr></tr>');
                row.append('<td>' + user.firstName + '</td>');
                row.append('<td>' + user.lastName + '</td>');
                row.append('<td>' + user.age + '</td>');
                row.append('<td>' + user.gender + '</td>');
                row.append('<td>' + user.email + '</td>');
                row.append('<td>' + user.mobile + '</td>');
                usersTableBody.append(row);
            });
        },
        error: function(err) {
            console.error('Error fetching user data:', err);
        }
    });
  
    // Download button functionality
    $('#downloadButton').click(function() {
        var table = document.getElementById('usersTable');
  
        // Convert the table to a workbook
        var wb = XLSX.utils.table_to_book(table, {
            sheet: "Users",
            raw: true,
            cellStyles: true
        });
  
        // Get the worksheet and its range
        var ws = wb.Sheets["Users"];
        var range = XLSX.utils.decode_range(ws['!ref']);
  
        // Set column width for the email column
        if (!ws['!cols']) ws['!cols'] = [];
        ws['!cols'][4] = { wch: 40 }; // Increase width of the email column
  
        // Apply style to each cell in the first row (header)
        for (let C = range.s.c; C <= range.e.c; ++C) {
            var cellAddress = { c: C, r: 0 };
            var cellRef = XLSX.utils.encode_cell(cellAddress);
            if (ws[cellRef]) {
                ws[cellRef].s = {
                    font: {
                        bold: true,
                        color: { rgb: "000000" } // Header font color (black)
                    },
                    fill: {
                        patternType: "solid",
                        fgColor: { rgb: "00FF00" } // Green background color
                    },
                    alignment: {
                        horizontal: "center"
                    }
                };
            }
        }
  
        // Insert an empty row after the header
        XLSX.utils.sheet_add_aoa(ws, [[]], { origin: -1 });
  
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'users_data.xlsx');
    });
  });
  
  $('#downloadQuiz').click(function() {
    var table = document.getElementById('quizzesTable');

    // Convert the table to a workbook
    var wb = XLSX.utils.table_to_book(table, {
        sheet: "Quizzes",
        raw: true,
        cellStyles: true
    });

    // Get the worksheet and its range
    var ws = wb.Sheets["Quizzes"];
    var range = XLSX.utils.decode_range(ws['!ref']);

    // Set column width to double for each column
    if (!ws['!cols']) ws['!cols'] = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        ws['!cols'][C] = { wch: 20 }; // Increase width of each column
    }

    // Apply styles to each cell in the first row (header)
    for (let C = range.s.c; C <= range.e.c; ++C) {
        var cellAddress = { c: C, r: 0 };
        var cellRef = XLSX.utils.encode_cell(cellAddress);
        if (ws[cellRef]) {
            ws[cellRef].s = {
                font: {
                    bold: true,
                    color: { rgb: "000000" } // Header font color (black)
                },
                fill: {
                    patternType: "solid",
                    fgColor: { rgb: "00FF00" } // Green background color
                },
                alignment: {
                    horizontal: "center",
                    vertical: "center" // Ensure the text is centered vertically as well
                }
            };
        }
    }

    // Center-align data in all cells
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            var cellAddress = { c: C, r: R };
            var cellRef = XLSX.utils.encode_cell(cellAddress);
            if (ws[cellRef]) {
                if (!ws[cellRef].s) ws[cellRef].s = {};
                ws[cellRef].s.alignment = {
                    horizontal: "center",
                    vertical: "center" // Ensure the text is centered vertically as well
                };
            }
        }
    }

    // Insert an empty row after the header
    XLSX.utils.sheet_add_aoa(ws, [[]], { origin: -1 });

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'quiz_data.xlsx');
});

  
  $(document).ready(function() { 
  // Fetch user data from the server
  $.ajax({
      url: '/quizzes',
      method: 'GET',
      success: function(response) {
          var quizes = response.data;
          var quizTableBody = $('#quizzesTable tbody');

          quizes.forEach(function(quiz) {
            const formattedDate = formatDate(quiz.date);
              var row = $('<tr></tr>');
              row.append('<td>' + formattedDate + '</td>');
              row.append('<td>' + quiz.answer + '</td>');
              row.append('<td>' + quiz.firstName+ '</td>');
              row.append('<td>' + quiz.mobile + '</td>');
              quizTableBody.append(row);
          });
      },
      error: function(err) {
          console.error('Error fetching user data:', err);
      }
  });
  function formatDate(dateString) {
        console.log("call date string or not ");
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
    }
  });
