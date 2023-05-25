import {users} from "../database/models";
import { hashPassword, isPasswordMatching } from "../utilis/hashedPassword";
import { generateToken } from "../utilis/token";
const createNewUser = async(req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    //const emailRegex = /\S+@\S+\.\S+/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.json({status:400, message:"Invalid email address"})
    }
    if (!password || password.length < 8){
        return res.json({status:400, message:"Password must be at least 8 characters"})
    }

    try {
        const hashedPassword = await hashPassword(password);
        const existingUser = await users.findOne({where:{email}});

        if(existingUser){
            return res.json({status:400, message:"Email already exists"})
        }
        const newUser = await users.create({
            firstName,
            lastName, 
            email, 
            password:hashedPassword
        })
        return res.json({status:201, message:"created new user successfully", data:newUser})
        
    } catch (error) {
        console.log(error)
        return res.json({status:500, message:"Internal server"})
        
    }

}
const loginUser =async (req, res)=>{
    let {email, password} = req.body;
    const currentUser = await users.findOne({where:{email}})
    if(!currentUser){
        return res.json({status:404, message:"user is not exist"})
    }
    if(isPasswordMatching(password, currentUser.password)){
        users.password= null;
        const token = generateToken({currentUser});
        return res.json({message:"Successfully Logged in",status:200, data:currentUser, token})

    }

}

const allUser = async (req, res) => {
    try {
      const Users = await users.findAll();
      return res.json( Users );
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "Internal server" });
    }
  };
  
  const deleteAll = async(req,res)=>{
    try {
        const deeleteUser = await users.destroy()
        return res.json({status:201, message:"Delete user successfully", data:deeleteUser})
        
    } catch (error) {
        
      console.log(error);
      return res.json({ status: 500, message: "Internal server" });
    }

  }


export default {createNewUser, loginUser, allUser , deleteAll}