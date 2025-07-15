import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class RoomService {
  private currentRoom: any = null;
  private roomMembers: any[] = [];
  // register: any;

  constructor(private http: HttpClient) {}

  // Save current logged-in room
  setCurrentRoom(room: any): void {
    this.currentRoom = room;
    console.log(this.currentRoom)
  }

  // Get current logged-in room
  getCurrentRoom(): any {
    return this.currentRoom;
  }

  // Save room members (if fetched)
  setRoomMembers(members: any[]): void {
    this.roomMembers = members;
  }

  // Get room members
  getRoomMembers(): any[] {
    return this.roomMembers;
  }
  // Inside the RoomService class:
  register(roomData: any): Observable<any> {
  return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/register.php', roomData);
}

getMembers(roomData: any): Observable<any> {
  return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/getMembers.php', roomData);
}
getgroceries(roomNumber:any):Observable<any>{
  return this.http.post('http://localhost/ROOM-NEEDS/backend/expenses/fetchgroceries.php',roomNumber)
}
addgroceries(groceriesData:any):Observable<any>{
  return this.http.post('http://localhost/ROOM-NEEDS/backend/expenses/groceries.php',groceriesData)
}
login(roomData: any): Observable<any> {
  return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/login.php', roomData);
}
addMonthlyRent(rentdata:any):Observable<any> {
  return this.http.post('http://localhost/ROOM-NEEDS/backend/rent/add-rent.php', rentdata);
}

// getRent(room: string) {
//   return this.http.get(`http://localhost/ROOM-NEEDS/backend/rent/get-rent.php?roomNumber=${room}`);
// }
}
// @Injectable({ providedIn: 'root' })
// export class RoomService {
//   constructor(private http: HttpClient) {}

//   private currentRoom: any;

// setCurrentRoom(room: any): void {
//   this.currentRoom = room;
// }

// getCurrentRoom(): any {
//   return this.currentRoom;
// }


//   register(roomData: any): Observable<any> {
//     return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/register.php', roomData);
//   }

//   // login(roomNumber: string): Observable<any> {
//   //   return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/login.php', { roomNumber });
//   // }
//   login(roomData: any): Observable<any> {
//   return this.http.post('http://localhost/ROOM-NEEDS/backend/rooms/login.php', roomData);
// }

// }

