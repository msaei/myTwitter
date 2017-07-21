import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', component: PostsComponent }
];


export const routing = RouterModule.forRoot(routes);