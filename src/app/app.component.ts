import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import { map, Observable } from 'rxjs';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DictionaryService } from './dictionary.service';
import { Word } from './word';


export interface ResponseObject {
  code: string;
  message: string;
  status: string;
  data?: Word;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DictionaryUI';
  dictWords: Observable<ResponseObject[]> = new Observable<ResponseObject[]>();
  columnsToDisplay: string[] = ['word', 'edit','delete'];
  wordListener = new FormControl('', [Validators.required]);

  constructor(private dictionaryService: DictionaryService, public dialog: MatDialog) {}

  refresh() {
    this.dictWords = this.dictionaryService.getDictionary()
    .pipe(
          map((resp) => {
            return resp?.data;
          }),
        ); 
  }
  
  ngOnInit() {
    this.refresh();
  }
  
  onSave(){
    this.dictionaryService.saveWord({word: this.wordListener.value}).subscribe(d => {
      this.refresh();
      this.wordListener.reset();
    })
  } 
   deleteWord(word:string){
    this.dictionaryService.deleteWord(word).subscribe(d => {
      this.refresh();
    })
  }

  updateWord(actualWord: string, updateWord:string){
    this.dictionaryService.updateWord(actualWord, updateWord).subscribe(d => {
      this.refresh();
    })
  }

  openDialog(word: string) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {"word": word,"type":"update"}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult!='Cancelled'){
      this.updateWord(word, dialogResult);
      }
    });
  }

  openDialogOnDelete(word: string) {
    
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {"word": word,"type":"delete"}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==='DeleteConfirmed'){
      this.deleteWord(word);
      }
    });
  }
}
