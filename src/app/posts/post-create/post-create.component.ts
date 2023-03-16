 
import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostService } from "../post.service";
import {Post} from '../post.model'

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent  implements OnInit{
  valueTitle = '';
  valueContent = '';
  post: Post = {
    id : '',
    title:'',
    content: ''
  };

  private mode = 'create';
  private postId:string | null ;
 

  constructor(public PostService: PostService, public route:ActivatedRoute){}

  ngOnInit(): void {
    console.log(this.post?.title);
    
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if(paramMap.has('postId')){
        this.mode = 'edit'; 
        this.postId = paramMap.get('postId');
        this.post = this.PostService.getPost(this.postId!);
        
      }else{
        this.mode ='create';
        this.postId = null
      }
    });
  }


  onSavePost(form:NgForm){
    if (form.invalid){
      return  
    } 

    if(this.mode === 'create'){
      this.PostService.addPost( form.value.id, form.value.title,form.value.content);
    }else{
      this.PostService.updatePost(this.postId!,form.value.title,form.value.content)
    }
   
    form.resetForm();
    
  }
}
