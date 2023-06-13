import { Component } from '@angular/core';
import { HuffmanService } from '../huffman.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor(){}

  password: string;
  myInstance: HuffmanService = new HuffmanService();

  /**
   * @brief se encarga de llamar a 
   */
  createHuffman(){
    console.log("asies");
    console.log(this.password);
    //console.log(this.myInstance.inputText);
    this.myInstance.inputText = this.password; // input
    this.myInstance.encode(); // encode
    console.log(this.myInstance.encodedText); // encode

    if (this.myInstance.encodedText == '01011100101110'){
      console.log("Contraseñas iguales");
    }

    
  }
}


