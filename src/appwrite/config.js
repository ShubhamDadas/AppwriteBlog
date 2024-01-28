import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor (){
        this.client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteProjectId)

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
           return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
           )
        }
        catch(err){
            throw err;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
           try{
               return await this.databases.updateDocument(
                   conf.appwriteDatabaseId,
                   conf.appwriteCollectionId,
                   slug,{
                    title,
                    content,
                    featuredImage,
                    status
                   }
               )
           }
           catch(err){
            throw err;
           }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch(err){
            console.log("DeletePost Error")
            return false;
        }
    }
    
    //to get single document post
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            throw err
        }
    }

    //
    async getPosts(queries=[Query.equal("status","active")]){
          try{
              return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
              )
          }
          catch(err){
            console.log("GetPosts Error")
          }
    }

    //file upload service
    async uploadFile(file){
        try{
               return await this.bucket.createFile(
                   conf.appwriteBucketId,
                   ID.unique(),
                   file
               )
        }
        catch(err){
            console.log("File Upload Error")
            return false;
        }
    }

    async deletFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(err){
            console.log("DeleteFile Error")
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appwriteService=new Service();
export default appwriteService