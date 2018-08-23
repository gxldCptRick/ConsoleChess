import fs from 'fs';
import lineReader from 'readline';

export class FileReader {
    
    processFile(filePath, callBack) {
        if(typeof filePath !== 'string') throw "filePath Must be a string"
        this.readFromFile(filePath, callBack);
    }   
    readFromFile(filePath, callBack) {
        let reader = lineReader.createInterface({
            input: fs.createReadStream(filePath, 'utf-8')
        });

        reader.on('line', (line) => {
            let proccessedLine = line.split(' ');
            callBack(proccessedLine);
        });

    }   
}


