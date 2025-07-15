// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RoomService } from 'src/app/services/room.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-split',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './split.html',
// // })
// // export class SplitComponent {
// //   totalAmount: number = 0;
// //   splitPerPerson: number = 0;
// //   members: any[] = [];

// //   constructor(private roomService: RoomService , private router:Router) {}

// //   ngOnInit() {
// //     this.calculateSplit();
// //   }
// // goback(){
// //   console.log("Hii")
// //   this.router.navigate(['/dashboard']);
// // }
// //   calculateSplit() {
// //     const room = this.roomService.getCurrentRoom();
// //     if (!room) return;

// //     // Get members
// //     this.members = this.roomService.getRoomMembers();

// //     // Get groceries for the room
// //     const groceries = JSON.parse(localStorage.getItem(`${room}_groceries`) || '[]');

// //     // Calculate total
// //     this.totalAmount = groceries.reduce((sum: number, g: any) => sum + g.amount, 0);

// //     // Split equally
// //     const memberCount = this.members.length;
// //     this.splitPerPerson = memberCount > 0 ? this.totalAmount / memberCount : 0;
// //   }
// // }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RoomService } from 'src/app/services/room.service';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-split',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './split.html',
// })
// export class SplitComponent {
//   totalAmount: number = 0;
//   splitPerPerson: number = 0;
//   members: any[] = [];
//   roomNumber: string = '';

//   constructor(
//     private roomService: RoomService,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     const room = this.roomService.getCurrentRoom();
//     if (room) {
//       this.roomNumber = typeof room === 'string' ? room : room.room_number;
//       this.fetchMembers();
//       this.fetchGroceries();
//     }
//   }

//   goback() {
//     this.router.navigate(['/dashboard']);
//   }

//   fetchMembers() {
//     const payload = { roomNumber: this.roomNumber };
//     this.http
//       .post<any>('http://localhost/ROOM-NEEDS/backend/rooms/getMembers.php', payload)
//       .subscribe((res) => {
//         if (res.status === 'success') {
//           this.members = res.members;
//           this.calculateSplit(); // Call after members are loaded
//         }
//       });
//   }

//   fetchGroceries() {
//     const payload = { roomNumber: this.roomNumber };
//     this.http
//       .post<any>('http://localhost/ROOM-NEEDS/backend/expenses/fetchgroceries.php', payload)
//       .subscribe((res) => {
//         if (res.status === 'success') {
//           const groceries = res.groceries;
//           this.totalAmount = groceries.reduce((sum: number, g: any) => sum + Number(g.cost), 0);
//           this.calculateSplit();
//         }
//       });
//   }

//   calculateSplit() {
//     const count = this.members.length;
//     this.splitPerPerson = count > 0 ? this.totalAmount / count : 0;
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './split.html',
  styleUrls:['./split.css']
})
export class SplitComponent {
  totalAmount: number = 0;
  splitPerPerson: number = 0;
  roomNumber: string = '';

  members: any[] = [];
  groceries: any[] = [];
  memberSplits: any[] = [];

  constructor(
    private roomService: RoomService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const room = this.roomService.getCurrentRoom();
    if (room) {
      this.roomNumber = typeof room === 'string' ? room : room.room_number;
      this.fetchData();
    }
  }

  goback() {
    this.router.navigate(['/dashboard']);
  }

  fetchData() {
    const payload = { roomNumber: this.roomNumber };

    // Fetch members
    this.http
      .post<any>('http://localhost/ROOM-NEEDS/backend/rooms/getMembers.php', payload)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.members = res.members;

          // Fetch groceries after members are loaded
          this.http
            .post<any>(
              'http://localhost/ROOM-NEEDS/backend/expenses/fetchgroceries.php',
              payload
            )
            .subscribe((gRes) => {
              if (gRes.status === 'success') {
                this.groceries = gRes.groceries;
                this.calculateSplit();
              }
            });
        }
      });
  }

  calculateSplit() {
    this.totalAmount = this.groceries.reduce(
      (sum: number, g: any) => sum + Number(g.cost),
      0
    );

    const memberCount = this.members.length;
    this.splitPerPerson = memberCount > 0 ? this.totalAmount / memberCount : 0;

    this.memberSplits = this.members.map((member: any) => {
      const paid = this.groceries
        .filter((g: any) => g.added_by.toLowerCase() === member.name.toLowerCase())
        .reduce((sum: number, g: any) => sum + Number(g.cost), 0);

      return {
        name: member.name,
        paid: paid,
        share: this.splitPerPerson,
        remaining: (this.splitPerPerson - paid),
      };
    });
  }
}
