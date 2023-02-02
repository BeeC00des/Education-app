import { Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit{
  posts:Post[] = [];


  ngOnInit(): void {
    this.posts = this.postsService.getPosts(); 
  }

  //  posts:any = [
  //   { title: 'Welcome to jonneburg',  content: 'Go global'},
  //   { title: 'Grow with God',  content: 'Pain free'},
  //   { title: 'I love coding and developing ',  content: 'Truly, i can do anything'}
  //  ]

   
   
  //  totalPost = this.posts.length;
   

  constructor(public postsService:PostService) {

  }

}
