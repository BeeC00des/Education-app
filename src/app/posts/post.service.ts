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


   addPost(id:string, title:string, content:string){
    const post:Post = {
        id: id,
        title:title,
        content:content
    }

    this.http.post<{message:string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) =>{
      console.log(responseData);
      this.posts.push(post);
      this.PostUpdated.next([...this.posts])
    })
   }
}