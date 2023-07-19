const User = require("../model/userModel.js");

exports.home = (req, res) => {
    res.send("Hello World!")
}

exports.createuser = async(req,res) => {
    // Extract info
    try{
        const {name, email} = req.body;

        if(!name || !email){
            throw new Error("Name and Email are required");
        }

        const userExists = User.findOne({email});

        if (userExists) {
            throw new Error("User already exists!");
        }
        const user = await User.create({
            name,
            email
        });

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user
        });

    } catch (error){
        console.log(error);
        res.status(400).json({
            sucess: false,
            message: error.message,
        })
    }
}

exports.getusers = async(req, res) => {
    try{
        const users = await User.find({});
        if(!users || users.length == 0){
            res.status(201).json({
                success:true,
                message: "no Users"
            });
        }
        res.status(200).json({
            success:true,
            users
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteuser = async(req, res) => {
    try{
        const userId = req.params.uid;//if it is uid(userid) then in router it also have to be the same name to work properly.
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({
            success:true,
            message: "User deleted successfully"
        });
    }
    catch(error){console.log(error);
    res.status(400).json({
        success:false,
        message: error.message
    });}
}

exports.edituser = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.uid,req.body);
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        })
    }
    catch(error){console.log(error);
    res.status(400).json({
        success:false,
        message: error.message
    });}
}