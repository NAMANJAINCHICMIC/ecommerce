import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-update-item',
  templateUrl: './vendor-update-item.component.html',
  styleUrls: ['./vendor-update-item.component.scss']
})
export class VendorUpdateItemComponent implements OnInit {

  userId  = this.authService.getUserId()
  productId : string|null ='';
  uploadImage : Blob | string=''
  imgPath='';
  picUpladed = false;
  showError= false;
  updateProductForm: FormGroup<{
    productName: FormControl<string | null>,
    price: FormControl<string | null>,
    detail: FormControl<string | null>,
    pathToPic: FormControl<string | null>,
    userId: FormControl<string | null>,
    available: FormControl<string | null>,
 
   
}>;
  info:DocumentData = [];

  constructor(private fireStorage : AngularFireStorage ,private router: Router ,private toastr: ToastrService, private http: HttpClient, private vendorService : VendorService , private authService :AuthService , private activatedRoute : ActivatedRoute){

    this.updateProductForm = new FormGroup(
          {
         
            productName: new FormControl('', [Validators.required ]),
          price: new FormControl('',[ Validators.required ]),     
          // category: new FormControl('',Validators.required ),
          available: new FormControl('',[Validators.required ]),
          userId: new FormControl(this.userId),
          detail: new FormControl('',[Validators.required ]),
          pathToPic: new FormControl('', Validators.required ),
          }
        )
  }
  async ngOnInit(): Promise<void> {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log( this.productId);
    if( this.productId){
      const snap = await this.vendorService.getUniqueProduct( this.productId);
      if(snap){
      if (snap.exists()) {
               this.info = snap.data()      
              // console.log(this.info)   
          }
          this.updateProductForm = new FormGroup(
            {
           
              productName: new FormControl(this.info['productName'], [Validators.required ]),
            price: new FormControl(this.info['price'],[ Validators.required ]),     
            // category: new FormControl('',Validators.required ),
            available: new FormControl(this.info['available'],[ Validators.required ]),
            userId: new FormControl(this.userId),
            detail: new FormControl(this.info['detail'],[Validators.required ]),
            pathToPic: new FormControl(this.info['pathToPic'], Validators.required ),
            }
          )
    }
  }
  
  }
  

  
get controlName(){
  return this.updateProductForm.controls;
}

onSubmit(){
  if (this.updateProductForm.valid ) {
   this.vendorService.updateProduct(this.updateProductForm.value , this.productId)


} else {
  // console.log("show errors")
  this.showError = true;
}
}

  async imageUpload(event:any){
  const file = event.target.files[0]
  if(file){
    const path = `item/${file.name}`
    const uploadItem = await this.fireStorage.upload(path,file)
   this.imgPath  = await uploadItem.ref.getDownloadURL()
    this.updateProductForm.controls['pathToPic'].patchValue(this.imgPath)
// console.log(this.imgPath)
  }
  
this.picUpladed = true;


}
}
