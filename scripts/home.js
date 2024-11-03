document.querySelectorAll('.dir-btn').forEach(button => {
    button.addEventListener('click', () => {
      const subDirectory = button.nextElementSibling;
      subDirectory.classList.toggle('open');
    });
  });
  
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
const body = document.body
anchors.forEach(anchor => {
  const p = `${anchor.getAttribute("href")}.html`;
  getModifiedDate(p).then(lastModifiedDate => {
    if (lastModifiedDate) {
      anchor.textContent += ` (last modified: ${timeFormat(lastModifiedDate)})`;
    } else {
      anchor.textContent += ` (last modified: unknown)`;
    }
  }).catch(error => {
    console.error('Error fetching last modified date:', error);
    anchor.textContent += ` (last modified: error)`;
  });
});

buttons.forEach(button => {
  p = getAlphanumeric(button.textContent)
  if (button.textContent == "└──index"){
    p = "/"
  }
  getModifiedDate(p).then(lastModifiedDate => {
    if (lastModifiedDate) {
      button.textContent += ` (last modified: ${timeFormat(lastModifiedDate)})`;
    } else {
      button.textContent += ` (last modified: unknown)`;
    }
  }).catch(error => {
    console.error('Error fetching last modified date:', error);
    button.textContent += ` (last modified: error)`;
  });
});