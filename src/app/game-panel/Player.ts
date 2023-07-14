import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface PlayerData {
  id: string;
  pos: number;
  name: string;
  score: number;
}

export class Player {
  private _id!: string;
  private _pos!: number;
  private _name!: string;
  private _score!: number;
  public onUpdate: Subject<PlayerData>;

  constructor(id: string, pos: number, name: string, score: number) {
    this._id = id;
    this._pos = pos;
    this._name = name;
    this._score = score;
    this.onUpdate = new Subject();
  }

  get ID(): string {
    return this._id;
  }

  getJson(): PlayerData {
    return {
      id: this._id,
      name: this._name,
      score: this._score,
      pos: this._pos,
    };
  }

  getScore(): number {
    return this._score;
  }

  updateScore(diff: number): void {
    this._score -= diff;
    this.onUpdate.next(this.getJson());
  }
}
