import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ReservedRoom, Room, User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(private http: HttpClient) { }

 apiUrl="http://localhost:3000"
  getLoginData(): Observable<User> {
    return this.http.get<User>("http://localhost:3000/login").pipe(tap(
      (userdata) => {
        console.log(userdata)
      }
    ))

  }
  getreservedRooms(): Observable<Room[]> {
    return this.http.get<Room[]>("http://localhost:3000/reservedRooms").pipe(tap(
      (rooms) => {
       console.log('fetched reserved Rooms:', rooms)
      }))

  }

  // Holt alle Zimmer
  getAllRooms(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/rooms`);
  }

  // Holt reservierte Zimmer
 
  getReservedRooms(): Observable<ReservedRoom[]> {
    return this.http.get<ReservedRoom[]>(`${this.apiUrl}/reservedRooms`);
  }
  
  getAvailableRooms(startDate: string, endDate: string): Observable<number[]> {
    return this.getReservedRooms().pipe(
      map((reservedRooms: ReservedRoom[]) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
  
        // Filtert die reservierten Zimmer, deren Zeitraum sich überschneidet
        const unavailableRooms = reservedRooms
          .filter((room) => {
            const reservedStart = new Date(room.start);
            const reservedEnd = new Date(room.end);
            return (
              (start >= reservedStart && start <= reservedEnd) || // Startdatum überschneidet
              (end >= reservedStart && end <= reservedEnd) ||     // Enddatum überschneidet
              (start <= reservedStart && end >= reservedEnd)      // Zeitraum komplett innerhalb
            );
          })
          .map((room) => Number(room.roomNumber)); // Zimmernummern als Zahl extrahieren
  
        return unavailableRooms;
      }),
      switchMap((unavailableRooms) =>
        this.getAllRooms().pipe(
          map((rooms) => rooms.filter((room) => !unavailableRooms.includes(room)))
        )
      )
    );
  }
  
}
