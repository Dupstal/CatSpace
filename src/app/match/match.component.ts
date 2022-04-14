import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Card } from './models/card';
import { MatchService } from './services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly matchService: MatchService
  ) { }

  cardDeck: Card[] = [];
  flippedCards: Card[] = [];
  tries = 0;
  clickLock: boolean = false;

  ngOnInit(): void {
    this.matchService.fetchImages().pipe(take(1)).subscribe((images: string[]) => {
      images.forEach(image => {
        const card: Card = {
          path: image,
          condition: 'unflipped'
        };
        this.cardDeck.push({ ...card });
        this.cardDeck.push({ ...card });
      });
      this.shuffleDeck();
    })
  }

  shuffleDeck() {
    // 👨‍✈️
    this.cardDeck.forEach((card, index) => {
      const randomIndex = Math.floor(Math.random() * this.cardDeck.length);
      const temp = this.cardDeck[index];
      this.cardDeck[index] = this.cardDeck[randomIndex];
      this.cardDeck[randomIndex] = temp;
    });
  }

  flipCard(index: number) {
    const card = this.cardDeck[index];
    const flippedCard = this.flippedCards[0];

    if (this.flippedCards.length === 0) {
      card.condition = 'flipped';
      this.flippedCards.push(card);
      this.tries++;
    } else if (this.flippedCards.length === 1) {
      card.condition = 'flipped';
      this.clickLock = true;
      setTimeout(() => {
        if (flippedCard.path === card.path) {
          flippedCard.condition = 'matched';
          card.condition = 'matched';
          if (this.cardDeck.every(card => card.condition === 'matched')) {
            this.router.navigateByUrl("");
            window.alert('Congratulations! You won by flipping ' + this.tries + ' times!');
          }
        } else {
          flippedCard.condition = 'unflipped';
          card.condition = 'unflipped';
        }
        this.flippedCards = [];
        this.clickLock = false;
      }, 2500);
    }
  }

  leaveGame() {
    if (confirm('Are you sure you want to leave the game?')) {
      this.router.navigateByUrl("");
    }
  }
}
