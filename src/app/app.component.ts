import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos :Todo[] =[];
  public todoDone :Todo[] =[];
  public title :String = 'Lista de tarefas';
  public form: FormGroup;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      title :['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
        ])
      ] 
    })
    this.load();
  }
dateFormated(){
  let data = new Date();
  let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()+
       "  "+data.getHours()+":"+data.getMinutes(); 
  
  return  dataFormatada
}

    add(){
      const title = this.form.controls['title'].value;
      const id = this.todos.length + 1;
      
      this.todos.push(new Todo (id, title, false, this.dateFormated()))
      this.save();
      this.clear();
    }
  
  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todo',data);
    this.mode = 'list';
  }
 
  clear(){
    this.form.reset();
  }

  saveTodoDone(){
    const data = JSON.stringify(this.todoDone);
    localStorage.setItem('todoDone',data);
  }

  remove(todo:Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){      
      this.todos.splice(index,1);
      this.save();
    }
  }

  MakeTodo(todo:Todo){
    todo.done = !todo.done;

    if(todo.done){      
        this.todoDone.push(new Todo(todo.id,todo.title,true,this.dateFormated()))
    }
    else{
      const index = this.todoDone.findIndex(ele => ele.title = todo.title);
      if(index !== -1){      
        this.todoDone.splice(index,1); 
      }
    }
    this.save();
    this.saveTodoDone();
  }
  
  load(){
      const data = localStorage.getItem('todo') 
      const dataDone = localStorage.getItem('todoDone') 
      if (data!==null){
        this.todos = JSON.parse(data!);       
      } 
      if (dataDone!==null){
        this.todoDone = JSON.parse(dataDone!);       
      }  
  }
  changeMode(mode:String){
    this.mode = mode;
  }
}
