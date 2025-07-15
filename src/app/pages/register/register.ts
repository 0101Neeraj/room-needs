import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'] 
})
export class RegisterComponent {
  roomNumber = '';
  name = '';
  mobile = '';
  place = '';

  constructor(private roomService: RoomService, private router: Router) {}
  

goToLogin() {
  this.router.navigate(['/login']);
}

  registerRoom() {
  const roomData = {
    roomNumber: this.roomNumber,
    name: this.name,
    mobile: this.mobile,
    place: this.place
  };

  this.roomService.register(roomData).subscribe((res: any) => {
    if (res.status === 'success') {
      alert('Registered successfully!');
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed: ' + res.message);
    }
  });
}

}
