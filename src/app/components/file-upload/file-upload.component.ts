import { Component, Input, OnInit } from '@angular/core';
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

  hasImages: boolean = false;
  // currentImages: Image[] = [];

  image: string | ArrayBuffer;

  constructor(
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  onFilesCharged(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const currenItem: Image = files.item(i);
        const currenImage: Image = files.item(i);
        if (currenItem) {
          // this.fileUploadService
          //   .postFile(files.item(i) as File)
          //   .subscribe((res) => console.log(res));
          this.fileUploadService
            .getBase64ByImage(currenItem)
            .subscribe((res) => {
              console.log(res);
              this.image = res;
              this.hasImages = true;
              // this.currentImages.push(currenItem);
            });
        }
      }
    }

    // (event.target as HTMLInputElement).files = null;
    // (event.target as HTMLInputElement).value = '';
  }
}
