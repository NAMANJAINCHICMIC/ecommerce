import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';
import { defaultImage } from 'src/app/utils/constants/constant';

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
  defaultImage = defaultImage;
  constructor(private fireStorage : AngularFireStorage, private vendorService : VendorService , private authService :AuthService){
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
   this.vendorService.addNewProduct(this.addProductForm.value);
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
this.picUpladed = true;
}
}
