export async function preparePrintImages(images,print){
 await Promise.all(Array.from(images,image=>image.decode()));
 return print();
}
