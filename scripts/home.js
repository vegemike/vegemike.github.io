document.querySelectorAll('.dir-btn').forEach(button => {
    button.addEventListener('click', () => {
      const subDirectory = button.nextElementSibling;
      subDirectory.classList.toggle('open');
    });
  });

/*
function getModifiedDate(path) {
  return fetch(`https://api.github.com/repos/vegemike/vegemike.github.io/commits?path=${path}&per_page=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const lastModifiedDate = data[0].commit.committer.date;
        console.log(lastModifiedDate);
        return lastModifiedDate;
      } else {
        console.log('No commits found for this file.');
        return null;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });
}*/

function getMaxDate(dates) {
  const maxDate = dates.reduce((latest, current) => {
      const currentDate = new Date(current);
      return currentDate > latest ? currentDate : latest;
  }, new Date(dates[0])); 
  return maxDate.toISOString(); 
}

async function loadJson(filePath) {
  try {
      const response = await fetch(filePath);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error loading JSON:', error);
  }
}

function getAlphanumeric(string) {
  return string.match(/[a-zA-Z0-9]+/g)?.join('') || '';
}
function timeFormat(dateString) {
  console.log(dateString)
  const index = dateString.indexOf('T');
  return index !== -1 ? dateString.substring(0, index) : dateString;
}

dates = loadJson("/last_modified_dates.json")

document.getElementById("musicp") .textContent+= ` (${dates["/projects/music"]})`
document.getElementById("techp") .textContent+= ` (${dates["/projects/tech"]})`
document.getElementById("musicr") .textContent+= ` (${dates["/reviews/music"]})`
document.getElementById("tvr") .textContent+= ` (${dates["/reviews/tv"]})`

