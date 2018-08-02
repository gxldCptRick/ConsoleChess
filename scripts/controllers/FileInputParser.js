const fs = require('fs');
const readLine = require('readline');
const FileReader = {
    readInputs: [],
    processFile: (filePath) => {
        if(typeof filePath !== 'string') throw "filePath Must be a string"
        this.readFromFile(filePath);
    },    
    readFromFile: (filePath)=> {
        var fileReader = readLine.createInterface({
            input: fs.createReadStream(filePath)   
        });
        fileReader.on('line', function(lineRead){
            var array = lineRead.split(' ');
            this.readInputs.push(array); 
        });
    }
};

export {
    FileReader
}

