import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {

  //  posts:any = [
  //   { title: 'Welcome to jonneburg',  content: 'Go global'},
  //   { title: 'Grow with God',  content: 'Pain free'},
  //   { title: 'I love coding and developing ',  content: 'Truly, i can do anything'}
  //  ]

   @Input() posts:any = [];
   totalPost = this.posts.length;

}
