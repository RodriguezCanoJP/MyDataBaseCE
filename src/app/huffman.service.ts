import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';


interface HuffmanNode {
  char: string;
  frequency: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
}

@Injectable({
    providedIn: 'root'
  })

export class HuffmanComponent {
  inputText: string;
  encodedText: string;

  // Function to generate the Huffman tree
  generateHuffmanTree(input: string): HuffmanNode {
    const charFrequencyMap = new Map<string, number>();

    // Calculate the frequency of each character
    for (const char of input) {
      if (charFrequencyMap.has(char)) {
        charFrequencyMap.set(char, charFrequencyMap.get(char)! + 1);
      } else {
        charFrequencyMap.set(char, 1);
      }
    }

    // Create the initial list of nodes
    const nodes: HuffmanNode[] = [];
    for (const [char, frequency] of charFrequencyMap) {
      nodes.push({ char, frequency });
    }

    // Build the Huffman tree
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);

      const left = nodes.shift();
      const right = nodes.shift();

      const newNode: HuffmanNode = {
        char: '',
        frequency: left!.frequency + right!.frequency,
        left,
        right
      };

      nodes.push(newNode);
    }

    return nodes[0];
  }

  // Function to generate the Huffman codes for each character
  generateHuffmanCodes(node: HuffmanNode, code: string, codesMap: Map<string, string>): void {
    if (!node.left && !node.right) {
      codesMap.set(node.char, code);
      return;
    }

    this.generateHuffmanCodes(node.left!, code + '0', codesMap);
    this.generateHuffmanCodes(node.right!, code + '1', codesMap);
  }

  // Function to encode the input text using Huffman codes
  encode(): void {
    if (!this.inputText) {
      this.encodedText = '';
      return;
    }

    const huffmanTree = this.generateHuffmanTree(this.inputText);

    const codesMap = new Map<string, string>();
    this.generateHuffmanCodes(huffmanTree, '', codesMap);

    let encodedText = '';
    for (const char of this.inputText) {
      encodedText += codesMap.get(char)!;
    }

    this.encodedText = encodedText;
  }
}



