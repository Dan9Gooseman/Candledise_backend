import mongoose from "mongoose";
export default async function connectMGDB(dbURL) {
    try {
        await mongoose.connect(dbURL)
        console.log("Connect thành công")
    } catch(err) {
        console.log("server cháy rồi" + err)
    }
}