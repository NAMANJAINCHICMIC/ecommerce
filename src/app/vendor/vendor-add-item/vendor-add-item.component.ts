import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { environment } from 'src/environment';

@Component({
  selector: 'app-vendor-add-item',
  templateUrl: './vendor-add-item.component.html',
  styleUrls: ['./vendor-add-item.component.scss']
})
export class VendorAddItemComponent {
 
  userId  = this.authService.getUserId()
  uploadImage : Blob | string=''
  imgPath='';
  picUpladed = false;
  showError= false;
 
  

  constructor(private fireStorage : AngularFireStorage ,private router: Router ,private toastr: ToastrService, private http: HttpClient, private vendorService : VendorService , private authService :AuthService){

  }
  

  
    addProductForm = new FormGroup(
        {
       
          productName: new FormControl('', [Validators.required ]),
        price: new FormControl('',[ Validators.required ]),     
        available: new FormControl('',[ Validators.required ]),     
        // category: new FormControl('',Validators.required ),
        // available: new FormControl(true),
        userId: new FormControl(this.userId),
        detail: new FormControl('',[Validators.required ]),
        pathToPic: new FormControl('', Validators.required ),
        }
      )
get controlName(){
  return this.addProductForm.controls;
}

onSubmit(){
  if (this.addProductForm.valid ) {
   this.vendorService.addNewProduct(this.addProductForm.value)
  // this.mainService.addFood(this.addProductForm.value).subscribe(
  //   (res:any)=>{
  //     this.toastr.info(res.message);
  //     if(res.success){

  //       this.router.navigate([PAGE.HOME]);
  //     }
  //   }
  // );

} else {
  console.log("show errors")
  this.showError = true;
}
}

  async imageUpload(event:any){
  const file = event.target.files[0]
  if(file){
    const path = `item/${file.name}`
    const uploadItem = await this.fireStorage.upload(path,file)
   this.imgPath  = await uploadItem.ref.getDownloadURL()
    this.addProductForm.controls['pathToPic'].patchValue(this.imgPath)
console.log(this.imgPath)
  }
  // this.uploadImage = event.target.files[0]
//  const formData = new FormData()
//   formData.append('file',this.uploadImage)

//  this.mainService.foodImageUpload(formData).subscribe((res:any)=>{
//   // console.log(res.data.pathToPic);
//   // this.addProductForm.value.pathToPic =  environment.AUTH_API +res.data.pathToPic
//   this.addProductForm.controls['pathToPic'].patchValue(`${environment.AUTH_API}${res.data?.pathToPic}`)
this.picUpladed = true;
// },
//   (error:any) => {
//     this.toastr.error(error,'error');
//   })

}
}
