import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from 'src/app/models/image.model';
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

  currentImages: Image[] = [];

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
        const currenItem: Image = files.item(i);
        const currentImage: Image = files.item(i);
        if (currenItem) {
          // this.fileUploadService
          //   .postFile(files.item(i) as File)
          //   .subscribe((res) => console.log(res));
          this.fileUploadService
            .getBase64ByImage(currenItem)
            .subscribe((res) => {
              currentImage.base64 = res;
              currentImage.isFavorite = false;

              var existFavorite = this.currentImages.filter(x => x.isFavorite);
              currentImage.isNotFavorite = existFavorite.length > 0 ? true : false;

              this.currentImages.push(currentImage);

              if (this.currentImages.length < 4) {
                this.showAddImages = true;
              } else {
                this.showAddImages = false;
              }
            });
        }
      }
    }

    (event.target as HTMLInputElement).files = null;
    (event.target as HTMLInputElement).value = '';
  }

  onDelete(index: number) {
    this.currentImages.splice(index, 1);
    if (this.currentImages.length <= 3) {
      this.showAddImages = true;
    }
  }

  onFavorite(index: number) {
    const currentImage: Image = this.currentImages[index];
    currentImage.isFavorite = !currentImage.isFavorite;

    if (currentImage.isFavorite) {
      var otherImages = this.currentImages.filter(
        (image) => image.isFavorite == false
      );
      otherImages.forEach((image) => {
        image.isNotFavorite = true;
      });
      this.currentImages = [];
      this.currentImages.push(currentImage);
      this.currentImages = [...this.currentImages, ...otherImages];
    } else {
      this.currentImages.forEach((image) => {
        image.isFavorite = false;
        image.isNotFavorite = false;
      });
    }
  }
}
