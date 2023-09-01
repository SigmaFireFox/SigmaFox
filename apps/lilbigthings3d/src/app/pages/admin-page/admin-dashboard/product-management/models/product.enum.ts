export enum ProductForm {
  BasicDetails = 'Product basic details',
  ProductFiles = 'Product files',
  ProductImages = 'Product images',
}

export enum ProductFormFields {
  Title = 'title',
  PrimaryImage = 'primary-image-url',
  ShortDesc = 'short-description',
  LongDesc = 'long-description',
  Dimentions = 'dimentions',
  DimentionX = 'x',
  DimentionY = 'y',
  DimentionZ = 'z',
  FilesLabel = 'files-label',
  FileDesign = 'design-file',
  FilePrintLabel = 'print-files-label',
  FilePrintFast = 'print-file-fast',
  FilePrintStandard = 'print-file-standard',
  FilePrintOptimised = 'print-file-optimised',
  FilePrintCustom = 'print-file-custom', //
  ImagesLabel = 'images-label',
  ImagesDesign = 'images-design',
  ImagesProduct = 'images-product',
}

export enum ProductFormPlaceholders {
  Title = 'New Product',
  ShortDescription = 'Please provide a short description (128 characters max)',
  LongDescription = 'Provide a longer extended description here',
}

export enum ProductFormLabels {
  Dimentions = 'Dimentions (mm)',
  DimentionX = 'X',
  DimentionY = 'Y',
  DimentionZ = 'Z',
  Files = 'Files',
  FileDesign = 'Design file',
  FilePrintLabel = 'Print files',
  FilePrintFast = 'Fast',
  FilePrintStandard = 'Standard',
  FilePrintOptimised = 'Optimised',
  FilePrintCustom = 'Custom',
  Images = 'Images',
  ImagesDeign = 'Design',
  ImagesProduct = 'Product',
}
