import * as cloudstorage from '@google-cloud/storage';
import {Storage} from '@google-cloud/storage';

const storage = new Storage();
const bucket = storage.bucket('trueaddict-io-bucket');

const upload = async (req : any, res : any) : Promise<void> => {
    try {
        if (!req.file) {
            return res.status(400).send({message : 'No file to upload!'});
        }

    } catch (err) {
        console.log(err);

        res.status(500).send({
            message: `File upload failed ${req.file.originalname}. ${err}`,
        });
    }
}

const getFileList = async (req : any, res : any) => {
    try {
        const [files] = await bucket.getFiles();
        let fileInfos : any[] = [];
        
        files.forEach( (file) => {
            fileInfos.push(file);
        })

        res.send(fileInfos);
    } catch (err) {
        console.log(err);
    }
}

const getPublicFileList = async (req : any, res : any) => {
    try {
        const [files] = await bucket.getFiles({ prefix: 'public/', autoPaginate: false });
        let fileInfos : any[] = [];
        
        files.forEach( (file) => {
            fileInfos.push(file);
        })

        res.send(fileInfos);
    } catch (err) {
        console.log(err);
    }
}

const download = async (req : any, res : any) => {
    try {
        const options : cloudstorage.GetSignedUrlConfig = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 min
        };

        const url : cloudstorage.GetSignedUrlResponse = await bucket.file(req.params.name).getSignedUrl(options);
        res.redirect(url);
    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
}

export default {upload, getFileList, getPublicFileList, download};