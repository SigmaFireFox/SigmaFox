export interface ProductForDisplay extends Product {
  id: string;
  data: Product;
}

export interface Product {
  [key: string]: unknown;
  title: string;
  primaryImageUrl: string;
  shortDesc: string;
  longDesc: string[];
  dimentions: Record<string, number>;
  imagesDesignUrls?: string[];
  imagesProductUrls?: string[];
  fileDesign: AppFileData;
  filePrintFast: AppFileData;
  filePrintStandard: AppFileData;
  filePrintOptimised: AppFileData;
}

export interface ProductData {
  [key: string]: unknown | undefined;
  title: string;
  primaryImageUrl: string;
  shortDescription: string;
  longDescription: string[];
  dimentions: Record<string, number>;
  filesMetaData: ProductFilesMetaData;
  imagesMetaData: ProductImagesMetaData;
}

export interface AppFileData {
  url: string;
  displayValue: string;
  parameters: Record<string, unknown>;
}

export interface ProductFiles {
  [key: string]: File | undefined;
  designFile?: File;
  printFileFast?: File;
  printFileStandard?: File;
  printFileOptimised?: File;
}

export interface ProductImages {
  [key: string]: File[] | undefined;
  design?: File[];
  product?: File[];
}

export interface ProductImageUrls {
  [key: string]: string[] | undefined;
}

export interface ProductFilesMetaData {
  [key: string]: string | undefined;
  designFile: string;
  printFileFast?: string;
  printFileStandard?: string;
  printFileOptimised?: string;
}

export interface ProductImagesMetaData {
  [key: string]: string[] | undefined;
  design?: string[];
  product?: string[];
}
