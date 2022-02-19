const verifyAuthToken = (req : any, res : any, next : any) => {
    let token : string = req.query.token;
    if (!token) return res.status(404).send('Access Denied');
    try {
        next();
    } catch (err) {
        console.log(err);
    }
}

export default verifyAuthToken;