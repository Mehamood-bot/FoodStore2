import { Directive, HostListener, Input, HostBinding, ElementRef } from '@angular/core';

//we arer creating custom dorective from drop down ,this can be done by js , but we are prefering angular to change dom
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; //assign toogle open clas to flase

  constructor(private elRef: ElementRef) { }

  // @HostListener('click') toggleOpen(){
  // this.isOpen = !this.isOpen;

  // }

  //close toggle by clicking anywhere, we are taking click any wher from document, and event give what it is clicked
  //runs on ever click 
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // console.log(event.target) //check target
    // console.log(this.elRef.nativeElement.contains(event.target)) // this is true when user click  within element or else flase 
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
