import { Component } from '@angular/core';
import { HuffmanService } from '../huffman.service';

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

  createHuffman(): void {

    this.myInstance = new HuffmanService();
    this.myInstance.generateHuffmanTree(this.password); // generate
    this.myInstance.inputText = this.password; // input
    this.myInstance.encode(); // encode
    console.log(this.myInstance.encodedText); // encode
  }
}


