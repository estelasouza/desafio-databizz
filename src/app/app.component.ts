import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormsFeedback } from '../models/forms.models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public formFeedBack: FormsFeedback[] = [];
  public title : String = 'Comentários';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required

      ])],
      text:['',Validators.compose([
        Validators.minLength(3),
        Validators.required])]
    });

    this.load();
   
  }


  clear(){
    this.form.reset()
  }

  add(){
    const name = this.form.controls['name'].value;
    const text = this.form.controls['text'].value;
    const id = this.formFeedBack.length +1
    this.formFeedBack.push(new FormsFeedback(id, name,text))
    this.save()
    this.clear()
  }
  alteraTexto(){
    this.title = 'testando'
  }
  save(){
    const data = JSON.stringify(this.formFeedBack);
    localStorage.setItem('feedback',data);
  }

  load(){
    const data = localStorage.getItem('feedback');
    console.log(data)
    this.formFeedBack = JSON.parse(data)
    console.log(this.form)
  }
}
