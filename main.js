const file = document.getElementById('csvFileInput');

file.addEventListener('change', (event) => {
  getAsText(event.target.files[0]);
});

const getAsText = (fileToRead) => {
  const reader = new FileReader();

  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);

  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

const loadHandler = (event) => {
  const csv = event.target.result;
  processData(csv);
}

const processData = (csv) => {
  const allTextLines = csv.split(/\r\n|\n/);
  allTextLines.pop();

  const lines = [];
  allTextLines.forEach((line) => {
    const dataInfo = line.split(',');
    const tarr = [];
    dataInfo.forEach((data) => {
      tarr.push(data);
    })
    lines.push(tarr);
  })
  buildTable(lines);
}

const buildTable = (lines) => {
  lines.forEach((line,index) => {
    const canvas = document.getElementById("canvas");
    const output = `<div id="row${index}" class="row"></div>`;
    canvas.insertAdjacentHTML('beforeend', output);

    line.forEach(cell => {
      const row = document.getElementById(`row${index}`);
      const cellOutput = `<div class="cell color-${cell}"></div>`;
      row.insertAdjacentHTML('beforeend', cellOutput);
    })
  })
}

const errorHandler = (evt) => {
  if(evt.target.error.name == "NotReadableError") {
    alert("Can't read file !");
  }
}
