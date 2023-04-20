export class ProductImage extends File {
    base64?: string | ArrayBuffer;
    isFavorite?: boolean;
    isNotFavorite?: boolean;
    lastModifiedDate?: Date;
    onDeleted?: boolean;
    override lastModified: number;
    override name: string;
}