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
      console.log('Last Modified Date:', lastModifiedDate);
    } else {
      console.log('No commits found for this file.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}