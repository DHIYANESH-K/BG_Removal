// import { Webhook } from "svix"
// import userModel from "../models/userModel.js"
// import 'dotenv/config'

// export const clerkWebhooks=async(req,res)=>{
//     console.log("webhook called",req.body)
//     try {
//         // res.status(200).json({ success: true });
//         const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id":req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//             "svix-signature":req.headers["svix-signature"]
//         })

//         console.log("verified")
//         const {data,type}=req.body

//         switch (type) {
//             case "user.created":{
//                 console.log("cre")
//                 const userData={
//                     clerkId:data.id,
//                     email:data.email_addresses[0].email_address,
//                     firstName:data.first_name,
//                     lastName:data.last_name,
//                     photo:data.image_url
//                 }
//                 await userModel.create(userData)
//                 res.json({})
//                 break;
//             }
//             case "user.updated":{
//                 const userData={
//                     email:data.email_addresses[0].email_address,
//                     firstName:data.first_name,
//                     lastName:data.last_name,
//                     photo:data.image_url
//                 }
//                 await userModel.findOneAndUpdate({clerkId:data.id},userData)
//                 res.json({})
//                 break;
//             } 
//             case "user.deleted":{
//                 console.log("de")
//                 await userModel.findOneAndDelete({clerkId:data.id})
//                 res.json({})
//                 break;
//             }
//             default:
//                 console.log("....")
//                 res.json({})
//                 break;
//         }


//     } catch (error) {
//         console.log("error");
//         res.json({success:false,message:error.message})
//     }
// }



import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import "dotenv/config";

export const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body; // raw body (buffer)
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers);

    const { type, data } = evt;

    switch (type) {
      case "user.created":
        console.log("✅ user.created");
        await userModel.create({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        });
        break;

      case "user.updated":
        console.log("🔄 user.updated");
        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          }
        );
        break;

      case "user.deleted":
        console.log("❌ user.deleted");
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        console.log(`⚠️ Unhandled webhook type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
