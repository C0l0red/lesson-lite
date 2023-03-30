import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      classes: this.formBuilder.array([]),
    });
  }

  get name() {
    return this.createCourseForm.controls['name'];
  }

  get description() {
    return this.createCourseForm.controls['description'];
  }

  get classes() {
    return this.createCourseForm.controls['classes'] as FormArray;
  }

  addClassToForm() {
    const classForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      time: ['', Validators.required],
      price: [0, Validators.required],
    });

    this.classes.push(classForm);
  }

  deleteClassFromForm(classIndex: number) {
    this.classes.removeAt(classIndex);
  }
}
