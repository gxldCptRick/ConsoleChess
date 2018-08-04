const fs = require('fs');

export class FileReader {
    
    processFile(filePath, callBack) {
        if(typeof filePath !== 'string') throw "filePath Must be a string"
        this.readFromFile(filePath, callBack);
    }   
    readFromFile(filePath, callBack) {
        fs.readFile(filePath, 'utf8', function(err, data){
            if(err) throw err;
            let lines = data.split('\r\n');
            let proccessedLines = [];
            for(let i = 0; i < lines.length; i++){
                let line = lines[i];
                let points = line.split(/ /u);
                proccessedLines.push(points);
            }

            if(callBack) callBack(proccessedLines);
        });
    }
}


