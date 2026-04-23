import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKITE_PUBLIC_KEY,
    privateKey: process.env.IMAGEKITE_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKITE_URL
});

export default imagekit;