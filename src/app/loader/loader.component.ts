import { Component,OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading!: Observable<boolean>;

  constructor(private loaderService: CommonService) {}

  ngOnInit(): void {
    // Subscribe to the loader service's isLoading$ observable
    this.isLoading = this.loaderService.isLoading$;
    console.log(this.isLoading)
  }
}
