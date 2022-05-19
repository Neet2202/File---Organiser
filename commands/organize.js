const fs = require("fs"); 
const path = require("path"); 

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath) {

    //1. to check if srcPath is present
  if (srcPath == undefined) {
    srcPath = process.cwd();
    // console.log("source path is ",srcPath);
  }

  //2. to create a directory-> organized_files
  let organizedFiles = path.join(srcPath, "organized_files");
  console.log("organized files folder path is ", organizedFiles);
  if (fs.existsSync(organizedFiles) == false) {
    fs.mkdirSync(organizedFiles);
  } else console.log("folder already exists");

   //3. Reads the contents of the directory.-> basically reads the names of files present in directory
   let allFiles = fs.readdirSync(srcPath);


 //4.trvaerse over all the files and classify them on the basis of their extension (.pdf , .mp3)
   for (let i = 0; i < allFiles.length; i++){
  

      let fullPathOfFile = path.join(srcPath, allFiles[i]);
     
      console.log(fullPathOfFile);
      //1. check if it is a file or folder
      
      let isFile = fs.lstatSync(fullPathOfFile).isThisAFile(); //true-> file hai to  or false
      console.log(allFiles[i]+" is "+ isFile);
      if (isThisAFile) {
        //1.1 get ext name
        let ext = path.extname(allFiles[i]).split(".")[1];
        // console.log(ext);
        //1.2 get folder name from extension
        let folderName = getFolderName(ext); 
        copyFileToDest(srcPath, fullPathOfFile, folderName);
      }
   }
}

function getFolderName(ext) {


  for (let key in types) {
    // console.log(key);
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "miscellaneous";
}

function copyFileToDest(srcPath, fullPathOfFile, folderName) {
    // 1) Make destination folder path
   let destFolderPath = path.join(srcPath, "organized_files", folderName); 
   
   // 2) check if folder exists, if it does not then make new folder
   if (!fs.existsSync(destFolderPath)) {
     fs.mkdirSync(destFolderPath);
   }

   // 3) Move the file to destination folder
   let fileName = path.basename(fullPathOfFile); //abc.zip
   let destFileName = path.join(destFolderPath, fileName);    
                       // src        dest
   fs.copyFileSync(fullPathOfFile, destFileName);
}
   
module.exports = {
  organizeFnKey:organize
}