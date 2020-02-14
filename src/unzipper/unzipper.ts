import * as fs from 'fs';
import * as unzipper from 'unzipper';

export function handleRequest(path: string): void {
    const typeOfPath: {type: string, path: string} = fileOrDirectory(path);
    console.log('This => ', !typeOfPath.type);
    if(!typeOfPath.type) {
        return;
    }
    if(typeOfPath.type == 'file') {
        unzipperMethodFile(typeOfPath.path);
    }
    
    if(typeOfPath.type == 'directory') {
        console.log('enter here');
        searchFileNames(typeOfPath.path);
    }
}

function unzipperMethodFile(path: string): void {
    fs.createReadStream(path)
        .pipe(unzipper.Extract({ path: 'src/unzipped' }))
}

function renameFileName(file: string): string {
    if(file.includes('.zip')) {
        return file.replace('.zip', '');
    }
    return file;
}

function unzipperMethodDirectory(path: string, fileName: string): void {
    const newFileName: string = renameFileName(fileName);
    console.log(newFileName);

    if (fs.lstatSync(path).isDirectory()) {
        if (!fs.existsSync('src/unzipped/'+newFileName)){
            fs.mkdirSync('src/unzipped/'+newFileName);
        }
    }
    fs.createReadStream(path)
        .pipe(unzipper.Extract({ path: 'src/unzipped/'+newFileName  }))
}

function searchFileNames(path: string) {
    fs.readdirSync(path).forEach(fileName  => {
        // console.log(path+fileName)
        const filePathToZip: string  = path+'/'+fileName;
        unzipperMethodDirectory(filePathToZip, fileName);
    });
}

function fileOrDirectory(path: string): {type: string, path: string} {
    if (fs.lstatSync(path).isDirectory()) {
        return {
            type: 'directory', 
            path: path
        };
    }
    if (fs.lstatSync(path).isFile()) {
        return {
            type: 'file', 
            path: path
        };
    }

    return {type: '', path: ''};
}