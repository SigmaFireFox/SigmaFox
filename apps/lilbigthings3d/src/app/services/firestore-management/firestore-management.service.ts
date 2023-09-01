/* eslint-disable no-async-promise-executor */
import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Product,
  ProductForDisplay,
  ProductImageUrls,
} from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';
import { environment } from 'src/environments/environment';
import { AppUserProfile } from '../user/user.interface';
import { UserOrder } from '../orders/orders.service';
import { MaterialInput } from 'src/app/pages/admin-page/admin-dashboard/cost-pricing-management/costs-dashboard/material-schedule/material-schedule.component';
import { ProductFileType } from 'src/app/pages/admin-page/admin-dashboard/product-management/services/product-management.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async initialiseProductDocument(product: Product): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const productDocRef = await addDoc(
        collection(this.db, 'products'),
        product
      );
      resolve(productDocRef.id);
    });
  }

  updateProduct(productID: string, product: Product): void {
    // eslint-disable-next-line no-async-promise-executor
    setDoc(doc(this.db, 'products', productID), product);
  }

  addProductImagesByIDAndCatergory(
    productID: string,
    catergory: string,
    images: File[]
  ): Promise<string[]> {
    const imageUrls: string[] = [];
    const storage = getStorage();
    return new Promise(async (resolve) => {
      for (const [index, image] of images.entries()) {
        const filePath = `${productID}/Images/${catergory}/${productID}-${catergory}-Image-${
          index + 1
        }`;
        const storageRef = ref(storage, filePath);
        await this.addFilesToStrorage(storageRef, image);
        imageUrls.push(await getDownloadURL(ref(storage, filePath)));
      }

      resolve(imageUrls);
    });
  }

  async addProductFileByIDAndType(
    productID: string,
    type: ProductFileType,
    file: File
  ): Promise<Record<string, string>> {
    return new Promise(async (resolve) => {
      const storage = getStorage();
      const filePath = `${productID}/Files/${type}/${productID}-${type}`;
      const storageRef = ref(storage, filePath);
      await this.addFilesToStrorage(storageRef, file);
      resolve({
        url: await getDownloadURL(ref(storage, filePath)),
        displayValue: `${productID}-${type}`,
      });
    });
  }

  addFilesToStrorage(
    storageRef: StorageReference,
    file: File
  ): Promise<StorageReference> {
    return new Promise((resolve) => {
      uploadBytes(storageRef, file).then(() => {
        resolve(storageRef);
      });
    });
  }

  async getAllProducts(): Promise<ProductForDisplay[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const listOfProducts: ProductForDisplay[] = [];
      const querySnapshot = await getDocs(collection(this.db, 'products'));
      querySnapshot.forEach((doc) => {
        const productToBeAdded = {
          id: doc.id,
          data: doc.data(),
        } as ProductForDisplay;
        listOfProducts.push(productToBeAdded);
      });
      resolve(listOfProducts);
    });
  }

  async getProductDataByID(productID: string): Promise<Product> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docRef = doc(this.db, 'products', productID);
      const docSnap = await getDoc(docRef);
      const product = docSnap.data() as Product;
      resolve(product);
    });
  }

  async getProductImagesUrlByID(productID: string): Promise<ProductImageUrls> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const images = {} as ProductImageUrls;
      const storage = getStorage();

      // Design Images
      const designImagePath = 'products/' + productID + '/images/design';
      const designImageFolderRef = ref(storage, designImagePath);
      const designImageFilesFound: string[] = [];
      const designImagesList = await listAll(designImageFolderRef);
      for (const itemRef of designImagesList.items) {
        const url = await getDownloadURL(ref(storage, itemRef.fullPath));
        designImageFilesFound.push(url);
      }
      images['images-design'] = designImageFilesFound;

      // Product Images
      const productImagePath = 'products/' + productID + '/images/product';
      const productImageFolderRef = ref(storage, productImagePath);
      const productImageFilesFound: string[] = [];
      const productImagesList = await listAll(productImageFolderRef);
      for (const itemRef of productImagesList.items) {
        const url = await getDownloadURL(ref(storage, itemRef.fullPath));
        productImageFilesFound.push(url);
      }
      images['images-product'] = productImageFilesFound;

      resolve(images);
    });
  }

  async getProductFilesDataByID(
    productID: string,
    product: Product
  ): Promise<Product> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      //   const storage = getStorage();

      //   // Get files metadata
      //   product.data.filesMetaData = {} as ProductFilesMetaData;
      //   let path = 'products/' + productID + '/files';
      //   let folderRef = ref(storage, path);

      //   await listAll(folderRef).then((response) => {
      //     response.items.forEach((itemRef) => {
      //       if (itemRef.name.includes('designFile')) {
      //         product.data.filesMetaData.designFile = itemRef.name;
      //       }
      //       if (itemRef.name.includes('printFileFast')) {
      //         product.data.filesMetaData.printFileFast = itemRef.name;
      //       }
      //       if (itemRef.name.includes('printFileStandard')) {
      //         product.data.filesMetaData.printFileStandard = itemRef.name;
      //       }
      //       if (itemRef.name.includes('printFileOptimised')) {
      //         product.data.filesMetaData.printFileOptimised = itemRef.name;
      //       }
      //       //   if (itemRef.name.includes('printFileCustom')) {
      //       //     product.data.filesMetaData.printFileCustom = itemRef.name;
      //       //   }
      //     });
      //   });

      //   product.images = { design: [], product: [] };
      //   // Get product images metadata
      //   path = 'products/' + productID + '/images/product';
      //   folderRef = ref(storage, path);
      //   let filesFound: string[] = [];

      //   await listAll(folderRef).then((response) => {
      //     response.items.forEach((itemRef) => {
      //       filesFound.push(itemRef.name);
      //     });
      //   });
      //   product.data.imagesMetaData.product = filesFound;

      //   // Get design images metadata
      //   path = 'products/' + productID + '/images/design';
      //   folderRef = ref(storage, path);
      //   filesFound = [];

      //   await listAll(folderRef).then((response) => {
      //     response.items.forEach((itemRef) => {
      //       filesFound.push(itemRef.name);
      //     });
      //   });
      //   product.data.imagesMetaData.design = filesFound;

      resolve(product);
    });
  }

  async addOrder(order: UserOrder): Promise<string> {
    const orderDocRef = await addDoc(collection(this.db, 'orders'), order);
    const userProfile = await this.getUserProfile(order.userID);
    order.orderNr = orderDocRef.id;
    if (!userProfile.orders) {
      userProfile.orders = [order];
    } else {
      userProfile.orders.push(order);
    }

    userProfile.id = order.userID;
    this.setUserProfile(userProfile);

    return orderDocRef.id;
  }

  async getUserProfile(id: string): Promise<AppUserProfile> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docRef = doc(this.db, 'user-profiles', id);
      const docSnap = await getDoc(docRef);
      const userProfile = docSnap.data() as AppUserProfile;
      resolve(userProfile);
    });
  }

  setUserProfile(userProfile: AppUserProfile): void {
    if (!userProfile.id) return;
    const userID = userProfile.id;
    delete userProfile.id;
    setDoc(doc(this.db, 'user-profiles', userID), userProfile, { merge: true });
  }

  getOrderByID(id: string): Promise<UserOrder> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docRef = doc(this.db, 'orders', id);
      const docSnap = await getDoc(docRef);
      const order = docSnap.data() as UserOrder;
      resolve(order);
    });
  }

  updateOrder(orderNumber: string, order: UserOrder): void {
    setDoc(doc(this.db, 'orders', orderNumber), order, { merge: true });
  }

  async updateUserOrders(userID: string, orders: UserOrder[]): Promise<void> {
    const userProfile = await this.getUserProfile(userID);
    userProfile.orders = orders;
    setDoc(doc(this.db, 'user-profiles', userID), userProfile, { merge: true });
  }

  async addMaterialInput(materialInput: MaterialInput): Promise<string> {
    const materialInoutDocRef = await addDoc(
      collection(this.db, 'material-inputs'),
      materialInput
    );

    return materialInoutDocRef.id;
  }

  async getAllMaterialInputs(): Promise<MaterialInput[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const listOfMaterialInputs: MaterialInput[] = [];
      const querySnapshot = await getDocs(
        collection(this.db, 'material-inputs')
      );
      querySnapshot.forEach((doc) => {
        const materialInputToBeAdded = doc.data() as MaterialInput;
        listOfMaterialInputs.push(materialInputToBeAdded);
      });
      resolve(listOfMaterialInputs);
    });
  }
}
