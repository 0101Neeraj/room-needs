import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class LoginComponent {
  // roomNumber = '';

  constructor(private roomService: RoomService, private router: Router) {}

  roomNumber: string = '';

loginRoom() {
  const roomData = {
    roomNumber: this.roomNumber
  };

  this.roomService.login(roomData).subscribe((res: any) => {
    if (res.status === 'success') {
      alert('Login successful!');
      this.roomService.setCurrentRoom(this.roomNumber);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Room not found. Please register.');
    }
  });
}
goToRegister() {
  this.router.navigate(['/register']);
}


}
