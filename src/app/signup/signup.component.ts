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

  password!: string;
  myInstance!: HuffmanService;

  createHuffman(){
    
    this.myInstance = new HuffmanService();
    this.myInstance.generateHuffmanTree(this.password); // generate
    this.myInstance.inputText = this.password; // input
    this.myInstance.encode(); // encode
    console.log(this.myInstance.encodedText); // encode

    
  }
}


