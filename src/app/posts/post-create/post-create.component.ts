import { ConstantPool } from "@angular/compiler";
import { Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  valueTitle = '';
  valueContent = '';

  @Output() postCreated = new EventEmitter();
  // newPost = 'Grow bee!';

  onAddPost(){
    const post = {
      title : this.valueTitle,
      content: this.valueContent
    }
    // console.log(post);
    this.postCreated.emit(post)

  }

}
