export class ProductImage extends File {
    base64?: string | ArrayBuffer;
    isFavourite?: boolean;
    isNotFavourite?: boolean;
    lastModifiedDate?: Date;
    onDeleted?: boolean;
    archivoId?: number;
    override lastModified: number;
    override name: string;
}