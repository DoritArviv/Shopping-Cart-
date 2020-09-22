const app = require('express');
const router = app.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user.model');
const env = require('../envairoment/env')

//Register
router.route('/addUser').post((req,res)=>{
    addUser = new User(req.body);

    User.findOne({username : addUser.username}, (err , user)=>{
        //find if user exist
        if(user){
            res.status(400).send('User Exist, try login');
        }else{
            //Hash= add user to DB
            bcrypt.hash(addUser.password,10,(err, hash)=>{
                if(err){
                    throw new Error(err.message)
                }
                addUser.password = hash;
            });
            //now we save the user
            addUser.save()
            .then(()=>{
                const tokenObj = {
                    username: addUser.username,
                    email: addUser.email
                }
                const token = generateToken(tokenObj);
                    res.status(200).json({'token': token});
            }).catch(error => {
                res.status(400).send(error);
            });
        }
    })
});
// Get All Users
router.route('/users').get((req, res) => {
    User.find((err, users) => {
        if (err) {
            console.log('Cant Find Users');
            res.status(400).send(err);
        }
        res.status(200).send(users);
    })
});




//Login
router.route('/login').post((req,res)=>{
    User.findOne({username : req.body.username}, async (err, user)=>{
        // if no user dound send error
        if (!user) {
            res.status(400).send('username or password incorrect');
        } else {
            // if found user -> de-crypt password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                const token = generateToken(user)
                res.status(200).json({'token': token});
            } else {
                res.status(401).send('Wrong Password');
            }
        }
    } )
})

//get user when the user enter to web
router.route('/get-user').post(async (req, res) => {
    
    if (req.body.token === null) {
        res.status(400).send('No User');
    }
    let userFromClient = await jwt.verify(req.body.token, env.secret);
    User.findOne({username: userFromClient.loginUser.username}, (err, user) => {
        if (err) {
            res.status(403).send('Not Authorized');
        } else {
            res.status(200).json(user);
        }
    });
});


// HELPER FUNCTIONS //
function generateToken(loginUser) {
    return jwt.sign({loginUser}, env.secret);
}
module.exports = router;