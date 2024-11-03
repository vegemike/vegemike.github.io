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

function getAlphanumeric(string) {
  return string.match(/[a-zA-Z0-9]+/g)?.join('') || '';
}
function timeFormat(dateString) {
  console.log(dateString)
  const index = dateString.indexOf('T');
  return index !== -1 ? dateString.substring(0, index) : dateString;
}

const anchors = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

anchors.forEach(anchor => {

});

buttons.forEach(button => {

});