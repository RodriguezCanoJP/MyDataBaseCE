extern volatile unsigned long timer0_millis;


// Se nombran los puertos con sus respectivas variables
int pushButton = 2;
const int ledErr = 3;
const int ledDel = 4;
const int ledRit = 5;
const int bzzr = 6;

// Se nombran algunas constantes que ayudarán a demarcar el tiempo para la lectura del morse
int ledErrState = LOW;
int ledDelState = LOW;
int ledRitState = LOW;
int bzzrState = LOW;
unsigned long previousMillis = 0;
const long intervalo = 2000; //valor a referenciar para obtener cada cuanto pasa 1 segundo 

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(pushButton, INPUT);
  pinMode(ledErr, OUTPUT);
  pinMode(ledDel, OUTPUT);
  pinMode(ledRit, OUTPUT);
  pinMode(bzzr, OUTPUT);

   
 

}

void loop() {
  // put your main code here, to run repeatedly:
  int buttonState = digitalRead(pushButton);
  noInterrupts();
  if(buttonState == HIGH){
    if(millis()<=500){
      timer0_millis = 0;
      interrupts();
    
      Serial.print("-");
      
      }
    if(millis()>=500){
      timer0_millis = 0;
      interrupts();
    
      Serial.print(".");
      
      }
      
    delay(500);
    }else{
      timer0_millis = 0;
      interrupts();
      Serial.println("");
      delay(1000);
      }
  
}
