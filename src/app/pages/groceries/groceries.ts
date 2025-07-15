import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './groceries.html',
  styleUrls:['./groceries.css']
})
export class GroceriesComponent {
  item: string = '';
  amount: string = '';
  paidBy: string = '';
  groceryList: any[] = [];
  roomNumber: string='';
   showForm: boolean = false;
   members:any[]=[];
  constructor(private roomService: RoomService ,private router: Router ) {}

  ngOnInit() {
    this.loadGroceries();
    this.memberslist();
    
 
}
toggleForm() {
     this.showForm = !this.showForm;
   }
  

  loadGroceries(){
     console.log("entered")
   const room = this.roomService.getCurrentRoom();
   console.log(room)
   this.roomNumber=room
  console.log(room)
  if (room) {
  const payload: any = {
    roomNumber: this.roomNumber
  };
  console.log(payload)
    this.roomService.getgroceries(payload).subscribe((res: any) => {
      if (res.status === 'success') {
        this.groceryList = res.groceries;
      } else {
        console.warn(res.message);
      }
    });
  }
  }
  addgroceries(){
    const additems={
      roomNumber: this.roomNumber,
  item: this.item,
  amount: this.amount,
  paidBy : this.paidBy
    }
    this.roomService.addgroceries(additems).subscribe((res: any) => {
      if (res.status === 'success') {
        alert(res.message)
      } else {
        console.warn(res.message);
      }
    });
    this.loadGroceries();
  }
  memberslist(){
    const room = this.roomService.getCurrentRoom();
  if (room) {
  const payload: any = {
    roomNumber: room
  };
    this.roomService.getMembers(payload).subscribe((res: any) => {
      if (res.status === 'success') {
        this.members = res.members;
        console.log(this.members)
        this.roomService.setRoomMembers(res.members);
      } else {
        console.warn(res.message);
      }
    });
}}
}
// toggleForm() {
//   this.showForm = !this.showForm;
// }
// }
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http'; // ✅ Proper HttpClient import
// import { RoomService } from 'src/app/services/room.service';

// @Component({
//   selector: 'app-groceries',
//   standalone: true,
//   imports: [CommonModule, FormsModule], // ✅ HttpClientModule added
//   templateUrl: './groceries.html',
// })
// export class GroceriesComponent {
//   item = '';
//   amount: number = 0;
//   paidBy = '';
//   showForm = false;
//   groceryList: any[] = [];
//   members: any[] = [];

//   constructor(private http: HttpClient, private roomService: RoomService) {} // ✅ Now valid

//   ngOnInit() {
//     this.loadGroceries();
//     this.loadMembers();
//   }

//   toggleForm() {
//     this.showForm = !this.showForm;
//   }

//   loadGroceries() {
//     const room = this.roomService.getCurrentRoom();
//     if (!room) return;
//     this.http
//       .post<{ status: string; groceries: any[] }>(
//         'http://localhost/ROOM-NEEDS/backend/expenses/fetchgroceries.php',
//         { roomNumber: room }
//       )
//       .subscribe((res) => {
//         if (res.status === 'success') {
//           this.groceryList = res.groceries;
//         }
//       });
//   }

//   loadMembers() {
//     const room = this.roomService.getCurrentRoom();
//     if (!room) return;
//     this.http
//       .post<{ status: string; members: any[] }>(
//         'http://localhost/ROOM-NEEDS/backend/rooms/getMembers.php',
//         { roomNumber: room }
//       )
//       .subscribe((res) => {
//         if (res.status === 'success') {
//           this.members = res.members;
//         }
//       });
//   }

//   addgroceries() {
//     const room = this.roomService.getCurrentRoom();
//     if (!room) return;
//     const payload = {
//       roomNumber: room,
//       item: this.item,
//       amount: this.amount,
//       paidBy: this.paidBy,
//     };

//     this.http
//       .post<{ status: string }>(
//         'http://localhost/ROOM-NEEDS/backend/expenses/addgrocery.php',
//         payload
//       )
//       .subscribe((res) => {
//         if (res.status === 'success') {
//           this.loadGroceries();
//           this.item = '';
//           this.amount = 0;
//           this.paidBy = '';
//           this.showForm = false;
//         }
//       });
//   }
// }
