import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls:['./dashboard.css'],
})
export class DashboardComponent {
  roomNumber: string | null = '';
  members: any[] = [];

  constructor(private roomService: RoomService) {}

  // ngOnInit() {
  //   this.roomNumber = this.roomService.getCurrentRoom();
  //   this.members = this.roomService.getRoomMembers();
  // }
  ngOnInit() {
    
  const room = this.roomService.getCurrentRoom();
  this.roomNumber = room
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
  }
}
}
