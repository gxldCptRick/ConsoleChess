const fs = require('fs');
const FileReader = {
    readInputs: [],
    processFile: (filePath, callBack) => {
        if(typeof filePath !== 'string') throw "filePath Must be a string"
        FileReader.readFromFile(filePath, callBack);
    },    
    readFromFile: (filePath, callBack)=> {
        fs.readFile(filePath, 'utf8', function(err, data){
            if(err) throw err;
            let lines = data.split('\r\n');
            lines.forEach(line => {
                let inputs = line.split(' ');
                FileReader.readInputs.push(inputs);
            });
            if(callBack) callBack();
        });
    }
};

export {
    FileReader
}

