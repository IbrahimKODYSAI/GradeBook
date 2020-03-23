const datas = {
  name: 'Parker Lewis',
  classroom: 'Eleventh grade',
  grades: [
    {
      name: 'Mathematics',
      coeff: 7,
      grade: 9,
    },
    {
      name: 'French writing',
      coeff: 3,
      grade: 5,
    },
    {
      name: 'English literature',
      coeff: 4,
      grade: 11,
    },
    {
      name: 'Physical Education',
      coeff: 2,
      grade: 14,
    },
    {
      name: 'Ancient history',
      coeff: 5,
      grade: 6,
    },
    {
      name: 'JavaScript',
      coeff: 3,
      grade: 18,
    },
  ],
};

const app = {
  init: function() {
    app.gradebookElement = document.getElementById('gradebook');
    app.gradebookElement.innerHTML = '';
    app.createTable();
    app.creatRow();
    app.creatAverage();
    app.gradebookElement.appendChild(app.table);
  },

  createTable: function() {
    app.table = document.createElement('table');
    app.table.id = 'table';
    const caption = document.createElement('caption');
    caption.textContent= `${datas.name} - ${datas.classroom}`;
    app.table.appendChild(caption);
    console.log(app.table)
  },
  creatRow: function(){
    datas.grades.forEach((grade) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = `${grade.name}`;
      row.appendChild(cell);

      const cellcoeff = document.createElement('td');
      const coeffInput =document.createElement('input');
      coeffInput.value = grade.coeff;
      coeffInput.maxLength = 1;

      coeffInput.addEventListener('change', function(){
        grade.coeff = Number(coeffInput.value);
      });
      cellcoeff.appendChild(coeffInput);
      row.appendChild(cellcoeff);

      const cellgrade = document.createElement('td');
      const gradeInput =document.createElement('input');
      gradeInput.value = grade.grade;
      gradeInput.maxLength = 2;
      const span = document.createElement('span');
      span.textContent = '/20'
      gradeInput.addEventListener('change', function(){
        grade.grade = Number(gradeInput.value);
        app.init();
      });
      cellgrade.appendChild(gradeInput);
      cellgrade.appendChild(span);
      row.appendChild(cellgrade);

      app.table.appendChild(row);
    });
  },
  creatAverage: function(){
    const averageRow = document.createElement('tr');
    averageRow.id = "averageRow"
    const averageName = document.createElement('th');
    averageName.textContent = 'Average';
    const averageGrade = document.createElement('td');
    averageGrade.colSpan = 2;
    averageRow.appendChild(averageName);
    app.table.appendChild(averageRow);
    
    const cumulObj = datas.grades.reduce((cumul, grade) => ({
      grade: cumul.grade + grade.grade * grade.coeff,
      coeff: cumul.coeff + grade.coeff,
    }), {
      grade: 0,
      coeff: 0,
    });
    const average = Math.round(cumulObj.grade / cumulObj.coeff * 100) / 100;
    averageGrade.textContent = average;
    
    averageRow.appendChild(averageGrade);
    
    // if(average < 10 ){
    //   averageGrade.className = 'error';
    // }else{
    //   averageGrade.className ='succes'
    // };
    averageGrade.className = average < 10 ? 'error' : 'succes';
  }
  

};

document.addEventListener('DOMContentLoaded', app.init);