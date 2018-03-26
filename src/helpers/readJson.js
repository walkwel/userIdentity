const readJson = (file, callback) => {  
    // new reader object 
    const reader = new FileReader();
    reader.readAsText(file);
    // on load success 
    reader.onload = function(event) {
        callback(JSON.parse(event.target.result))
    }
}
 export default readJson;