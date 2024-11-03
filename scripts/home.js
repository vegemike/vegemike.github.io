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
  console.log(dates)
  const maxDate = dates.reduce((latest, current) => {
      const currentDate = new Date(current);
      return currentDate > latest ? currentDate : latest;
  }, new Date(dates[0])); 
  return maxDate.toISOString(); 
}

async function getJson(filePath) {
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


async function setDates() {
  const dates = await getJson("/last_modified_dates.json")
  console.log(dates)
  document.getElementById("musicp").textContent += ` (${dates["/projects/music.html"]})`
  document.getElementById("techp").textContent += ` (${dates["/projects/tech.html"]})`
  document.getElementById("musicr").textContent += ` (${dates["/reviews/music.html"]})`
  document.getElementById("tvr").textContent += ` (${dates["/reviews/tv.html"]})`

  maxProjects = getMaxDate([dates["/projects/music.html"], dates["/projects/tech.html"]])
  maxReviews = getMaxDate([dates["/reviews/music.html"], dates["/reviews/tv.html"]])
  maxIndex = getMaxDate([dates["/reviews/music.html"], dates["/reviews/tv.html"], dates["/projects/music.html"], dates["/projects/tech.html"]])

  document.getElementById("index").textContent += ` (${maxIndex})`
  document.getElementById("reviews").textContent += ` (${maxReviews})`
  document.getElementById("projects").textContent += ` (${maxProjects})`
}
setDates()