import ImageKit from '@imagekit/nodejs';

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_SECRET_KEY, // This is the default and can be omitted
});


export async function uploadFile(file){
    const result=await imageKitClient.files.upload({
        file,
        fileName:"music_"+Date.now()
        ,
        folder: "/spotify-backend/songs"
    })
    return result
}







// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);