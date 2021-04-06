import { Component, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';
import { Post } from '../post-model';
import { PostService } from '../post-service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
 /* posts =[
    {title: 'First Post', content: 'This is the first posts content'},
    {title: 'Second Post', content: 'This is the second posts content'},
    {title: 'Third Post', content: 'This is the third posts content'}
  ]*/
posts : Post[] = [];
userIsAuthenticated = false;
private postSub=new Subscription;
private authStatusSub= new Subscription;

constructor(public postService: PostService, private AuthService: AuthService){

}

ngOnInit(){
  this.postService.getPosts();
  this.postSub=this.postService.geptPostUpdateListener().subscribe((posts: Post[])=>{
    this.posts=posts;
  });
  this.userIsAuthenticated=this.AuthService.getIsAuth();
  this.authStatusSub=this.AuthService.getAuthStatusListener().subscribe(isAuthenticated =>{
    this.userIsAuthenticated=isAuthenticated;
  });
}

ngOnDestroy(){
  this.postSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}

onDelete(postId: string){
  this.postService.deletePost(postId);
}

}
