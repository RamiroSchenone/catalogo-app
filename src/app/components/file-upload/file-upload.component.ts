import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductImage } from 'src/app/models/image.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() text: string;
  @Input() extensionAccept: string;
  @Input() multiple: boolean = false;

  @Output() onUploadChange: EventEmitter<any> = new EventEmitter();

  currentImages: ProductImage[] = [];
  imagesToUpload: any[] = [];

  showAddImages: boolean = true;
  // image: string | ArrayBuffer;

  constructor(
    private fileUploadService: FileUploadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onFilesCharged(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const currenItem: ProductImage = files.item(i);
        const currentImage: ProductImage = files.item(i);
        if (currenItem) {
          this.fileUploadService
            .postFile(files.item(i) as File)
            .subscribe((res) => {
              currentImage.archivoId = res.id;
              this.fileUploadService
                .getBase64ByImage(currenItem)
                .subscribe((res) => {
                  currentImage.base64 = res;
                  currentImage.isFavourite = false;

                  var existFavourite = this.currentImages.filter(
                    (x) => x.isFavourite
                  );
                  currentImage.isNotFavourite =
                    existFavourite.length > 0 ? true : false;

                  this.currentImages.push(currentImage);

                  this.onUploadChange.emit(this.currentImages);

                  if (this.currentImages.length < 4) {
                    this.showAddImages = true;
                  } else {
                    this.showAddImages = false;
                  }
                });
            });
        }
      }
    }

    (event.target as HTMLInputElement).files = null;
    (event.target as HTMLInputElement).value = '';
  }

  onDelete(index: number) {
    this.currentImages[index].onDeleted = true;
    setTimeout(() => {
      if (this.currentImages[index].isFavourite) {
        this.currentImages.forEach((image) => {
          image.isFavourite = false;
          image.isNotFavourite = false;
        });
      }

      this.currentImages.splice(index, 1);

      if (this.currentImages.length <= 3) {
        this.showAddImages = true;
      }

      this.onUploadChange.emit(this.currentImages);
    }, 200);
  }

  onFavourite(index: number) {
    const currentImage: ProductImage = this.currentImages[index];
    currentImage.isFavourite = !currentImage.isFavourite;

    if (currentImage.isFavourite) {
      var otherImages = this.currentImages.filter(
        (image) => image.isFavourite == false
      );
      otherImages.forEach((image) => {
        image.isNotFavourite = true;
      });
      this.currentImages = [];
      this.currentImages.push(currentImage);
      this.currentImages = [...this.currentImages, ...otherImages];
    } else {
      this.currentImages.forEach((image) => {
        image.isFavourite = false;
        image.isNotFavourite = false;
      });
    }

    this.onUploadChange.emit(this.currentImages);
  }
}
