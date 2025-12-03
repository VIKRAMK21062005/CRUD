import User from "../models/User.js";
import s3 from "../config/s3.js";

export const createUser = async (req, res) => {
  let imageUrl = null;

  if (req.file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const upload = await s3.upload(params).promise();
    imageUrl = upload.Location;
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    imageUrl
  });

  res.json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
