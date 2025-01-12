
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';
import { DatePicker } from 'primeng/datepicker';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [MatCardModule, ButtonModule, HeaderComponent, MatDatepickerModule, DatePicker, ReactiveFormsModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'

})
export class BookingComponent {
  // date: Date | undefined;
  formGroup: FormGroup;
  availableRooms: number[] = [];

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.formGroup = this.fb.group({
      startDate: [undefined, Validators.required],
      endDate: [undefined, Validators.required],
      roomNumber: [null, Validators.required]
    })

  }
  onDateChange() {
    const startDate = this.formGroup.value.startDate;
    const endDate = this.formGroup.value.endDate;

    if (startDate && endDate) {
      this.bookingService.getAvailableRooms(startDate, endDate).subscribe(
        (rooms) => {
          this.availableRooms = rooms;
        },
        (error) => {
          console.error('Fehler beim Laden der verfügbaren Zimmer:', error);
        }
      );
    }
  }
  
}
