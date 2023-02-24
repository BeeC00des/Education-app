import { Injectable } from "@angular/core";
import { Subject } from "rxjs"; 
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";

import {map} from 'rxjs/operators'
@Injectable({ providedIn : 'root'})

export class PostService {
   private posts: Post[] = [];

   private PostUpdated = new Subject<Post[]>();

   constructor(private http:HttpClient){}

   getPosts(){
     this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
     .pipe(map((postData) =>{
        return postData.posts.map((post:any) =>{
          return {
            title:post.title,
            content:post.content,
            id:post._id
          }
        })
     }))
     .subscribe(transPosts =>{
        this.posts = transPosts;
        this.PostUpdated.next([...this.posts])
     });
   }

   getPostUpdateListener(){
      return this.PostUpdated.asObservable();

    }

    getPost(id:string): any{
      const prepost = this.posts.find(post => post.id == id)
      
      return prepost
    }


   addPost(id:string, title:string, content:string){
    const post:Post = {
        id: id,
        title:title,
        content:content
    }

    this.http.post<{message:string, postId:string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) =>{

      console.log(responseData);
      const id = responseData.postId;

      post.id = id;
      this.posts.push(post);
      this.PostUpdated.next([...this.posts])
    })
   }


   updatePost(id:string, title:string, content:string){
    const post : Post ={
      id:id,
      title:title,
      content:content
    }
    this.http.put("http://localhost:3000/api/posts/" + id, post)
    .subscribe(response=> console.log(response))
   }

   deletePost(postId:string){
      this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() =>{
        // console.log("Course Deleted!")
        const updatePost = this.posts.filter(post => post.id !== postId);
        this.posts =updatePost;
        this.PostUpdated.next([...this.posts])
      })
   }
}