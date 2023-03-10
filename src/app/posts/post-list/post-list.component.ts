import { Component, OnDestroy, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  posts:Post[] = [];

  private postsSub : Subscription | undefined;

  constructor(public postsService:PostService) {}


  ngOnInit(): void {
     this.postsService.getPosts(); 
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }
}
