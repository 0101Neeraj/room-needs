import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rent-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rent-alerts.html',
  styleUrls: ['./rent-alerts.css']
})
export class RentAlertsComponent implements OnInit {
  rentList: any[] = [];
  roomNumber: string = '';
  userName: string = '';
  customMonth: string = '';
  customAmount: number = 0;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    const room = this.roomService.getCurrentRoom();
    if (room) {
      this.roomNumber = room;
  
      
      //this.loadRentHistory();
    }
  }

  // checkAndInsertRent() {
  //   const today = new Date();
  //   const monthYear = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  //   this.roomService.addMonthlyRent(this.roomNumber, monthYear, 3000, this.userName).subscribe();
  // }

  // loadRentHistory() {
  //   this.roomService.getRent(this.roomNumber).subscribe((res: any) => {
  //     this.rentList = res.rent || [];
  //   });
  // }

  addCustomRent() {
    if (!this.customMonth || !this.customAmount) return;
    const payload={
      roomNumber:this.roomNumber,
      monthYear: this.customMonth,
      amount:this.customAmount
  
    }
    this.roomService.addMonthlyRent(payload).subscribe((res: any) => {
      if (res.status === 'success') {
        alert(res.message)
      } else {
        console.warn(res.message);
      }
    });
       // this.loadRentHistory();
  
      ;
  }
}
