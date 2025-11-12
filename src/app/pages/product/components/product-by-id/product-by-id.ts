// import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-user-by-id',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './user-by-id.html',
// })
// export default class UserById implements OnInit {
//   private fb = inject(FormBuilder);
//   private productService = inject(ProductService);
//   private router = inject(Router);
//   private route = inject(ActivatedRoute);

//   public userForm: FormGroup;
//   public isSubmitting = false;
//   public isLoading = true;
//   public productId: number = 0;

//   constructor() {
//     this.userForm = this.fb.group({
//       id: [0],
//       nombre: ['', [Validators.required, Validators.minLength(3)]],
//       descripcion: ['', [Validators.required, Validators.minLength(3)]],
//       stock: ['', [Validators.required, Validators.minLength(6)]],
//       categoria: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   ngOnInit(): void {
//     this.userId = Number(this.route.snapshot.paramMap.get('id'));

//     if (this.userId) {
//       this.loadUser();
//     }
//   }

//   loadUser(): void {
//     this.userService.getUserById(this.userId).subscribe({
//       next: (user) => {
//         if (user) {
//           this.userForm.patchValue(user);
//           this.isLoading = false;
//         } else {
//           this.router.navigate(['/users']);
//         }
//       },
//       error: (error) => {
//         console.error('Error loading user:', error);
//         this.router.navigate(['/users']);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       this.isSubmitting = true;

//       this.userService.updateUser(this.userId, this.userForm.value).subscribe({
//         next: () => {
//           this.router.navigate(['/users']);
//         },
//         error: (error) => {
//           console.error('Error updating user:', error);
//           this.isSubmitting = false;
//         }
//       });
//     } else {
//       Object.keys(this.userForm.controls).forEach(key => {
//         this.userForm.get(key)?.markAsTouched();
//       });
//     }
//   }

//   onCancel(): void {
//     this.router.navigate(['/users']);
//   }

//   getErrorMessage(fieldName: string): string {
//     const control = this.userForm.get(fieldName);

//     if (control?.hasError('required')) {
//       return `${fieldName} es requerido`;
//     }

//     if (control?.hasError('minlength')) {
//       const minLength = control.errors?.['minlength'].requiredLength;
//       return `${fieldName} debe tener al menos ${minLength} caracteres`;
//     }

//     return '';
//   }

//   isFieldInvalid(fieldName: string): boolean {
//     const control = this.userForm.get(fieldName);
//     return !!(control?.invalid && control?.touched);
//   }
// }
