import {Component, OnInit} from '@angular/core';
import {PrimeService} from "./prime.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  public myNumber: number; // 1 < myNumber (int) < 799993^2
  public largestPrimeFactor: number;

  constructor(private primeService: PrimeService) {}

  ngOnInit(): void {
    this.initializeDefaults();
    let nr = this.myNumber;
    let prime = 2;
    while (prime <= Math.sqrt(nr)) {
      nr = this.divideOut(nr, prime);
      prime = this.primeService.nextPrime(prime);
    }
    this.largestPrimeFactor = nr === 1 ? this.primeService.previousPrime(prime) : nr;
  }

  private initializeDefaults() {
    this.myNumber = 600851475143;
  }

  private divideOut(nr: number, prime: number): number {
    while (nr % prime === 0) {
      nr = nr / prime;
    }
    return nr;
  }
}
