document.querySelectorAll('.dir-btn').forEach(button => {
    button.addEventListener('click', () => {
      const subDirectory = button.nextElementSibling;
      subDirectory.classList.toggle('open');
    });
  });
  
function getModifiedDate(path){
  fetch(`https://api.github.com/repos/vegemike/vegemike.github.io/commits?path=${path}&per_page=1`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const lastModifiedDate = data[0].commit.committer.date;
      console.log(lastModifiedDate);
      return lastModifiedDate
    } else {
      console.log('No commits found for this file.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
function getAlphanumeric(string) {
  return string.match(/[a-zA-Z0-9]+/g)?.join('') || '';
}
function timeFormat(dateString) {
  const index = dateString.indexOf('T');
  return index !== -1 ? dateString.substring(0, index) : dateString;
}

const anchors = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');
const body = document.body
anchors.forEach(anchor => {

  p = anchor.getAttribute("href")
  console.log(anchor)
  console.log(p)
  anchor.textContent += `(last modified: ${timeFormat(getModifiedDate(p))})`;
});
buttons.forEach(button => {
  p = getAlphanumeric(button.textContent)
  button.textContent += `(last modified: ${timeFormat(getModifiedDate(p))})`;
});