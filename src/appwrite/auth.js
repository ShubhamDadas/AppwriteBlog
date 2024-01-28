import conf from "../conf/conf";

import { Client,Account,ID } from "appwrite";

export class AuthService{
    Client=new Client();
    account;

    constructor()
    {
        this.Client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteProjectId);
        this.account=new Account(this.Client)
    }

    async createAccount({email,password,name}){
        try{
          const userAccount=   await this.account.create(ID.unique(),email,password,name)
          if(userAccount){
            //call another method
            return this.login(email,password)
          }else{
            //null
            return userAccount
          }
        }catch(err){
            throw err;
        }
    }

    async login({email,password}){
      try{
          return  await this.account.createEmailSession(email,password);
      }
      catch(err){
        throw err;
      }
    }

    async getCurrentUser(){
      try{
          // getting user account
         return await this.account.get();
      }
      catch(err){
           throw err
      }
      return null;
    }

    async logout(){
      try{
          return this.account.deleteSession();
      }
      catch(err){
          throw err
      }
    }
}
const authService=new AuthService()

export default authService