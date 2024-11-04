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

async function fileContents(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }
        
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error:", error);
    }
}